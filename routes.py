from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime
import sqlite3

app = Flask(__name__)

# Database setup
DB_PATH = 'cta_accessibility.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''CREATE TABLE IF NOT EXISTS requests
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                     line_name TEXT NOT NULL,
                     start_station TEXT NOT NULL,
                     final_station TEXT NOT NULL,
                     current_station TEXT NOT NULL,
                     timestamp TEXT NOT NULL,
                     status TEXT NOT NULL)''')
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template('landing.html')

@app.route('/userview/<station>', methods=['GET', 'POST'])
def user_view(station):
    if request.method == 'POST':
        line_name = request.form['line_name']
        start_station = request.form['start_station']
        final_station = request.form['final_station']
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        conn = get_db_connection()
        conn.execute('INSERT INTO requests (line_name, start_station, final_station, current_station, timestamp, status) VALUES (?, ?, ?, ?, ?, ?)',
                     (line_name, start_station, final_station, station, timestamp, 'active'))
        conn.commit()
        conn.close()
        
        return redirect(url_for('success'))
    
    return render_template('user_form.html', station=station)

@app.route('/success')
def success():
    return render_template('success.html')

@app.route('/workview/<line_name>/<station_name>')
def work_view(line_name, station_name):
    conn = get_db_connection()
    request = conn.execute('SELECT * FROM requests WHERE line_name = ? AND current_station = ? AND status = "active" ORDER BY timestamp DESC LIMIT 1',
                           (line_name, station_name)).fetchone()
    conn.close()
    
    needs_ramp = bool(request)
    
    return render_template('work_view.html', line_name=line_name, station_name=station_name, needs_ramp=needs_ramp)

@app.template_filter('format_datetime')
def format_datetime(value, format='%Y-%m-%d %H:%M:%S'):
    if value is None:
        return ""
    return datetime.strptime(value, '%Y-%m-%d %H:%M:%S').strftime(format)

if __name__ == '__main__':
    app.run(debug=True)