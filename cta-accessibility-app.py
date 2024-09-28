from flask import Flask, render_template, request, jsonify, url_for, redirect
from datetime import datetime
import sqlite3
import os

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
                     start_station TEXT NOT NULL,
                     end_station TEXT NOT NULL,
                     timestamp TEXT NOT NULL,
                     status TEXT NOT NULL)''')
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template('user_form.html')

@app.route('/submit_request', methods=['POST'])
def submit_request():
    start_station = request.form['start_station']
    end_station = request.form['end_station']
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    conn = get_db_connection()
    conn.execute('INSERT INTO requests (start_station, end_station, timestamp, status) VALUES (?, ?, ?, ?)',
                 (start_station, end_station, timestamp, 'active'))
    conn.commit()
    conn.close()
    
    return "Request submitted successfully"

@app.route('/worker')
def worker_view():
    conn = get_db_connection()
    requests = conn.execute('SELECT * FROM requests WHERE status = "active" ORDER BY timestamp DESC').fetchall()
    conn.close()
    return render_template('worker_view.html', requests=requests)

@app.route('/get_active_requests')
def get_active_requests():
    conn = get_db_connection()
    requests = conn.execute('SELECT * FROM requests WHERE status = "active" ORDER BY timestamp DESC').fetchall()
    conn.close()
    return render_template('worker_view.html', requests=requests)

@app.route('/update_request_status/<int:request_id>', methods=['POST'])
def update_request_status(request_id):
    conn = get_db_connection()
    conn.execute('UPDATE requests SET status = "completed" WHERE id = ?', (request_id,))
    conn.commit()
    request = conn.execute('SELECT * FROM requests WHERE id = ?', (request_id,)).fetchone()
    conn.close()
    return render_template('request_card.html', request=request)

@app.template_filter('format_datetime')
def format_datetime(value, format='%Y-%m-%d %H:%M:%S'):
    if value is None:
        return ""
    return datetime.strptime(value, '%Y-%m-%d %H:%M:%S').strftime(format)

if __name__ == '__main__':
    app.run(debug=True)
