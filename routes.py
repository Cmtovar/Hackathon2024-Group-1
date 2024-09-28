from flask import Flask, request, redirect, url_for
from datetime import datetime as dt

from .dataloader import load_data


app = Flask(__name__)
stations = load_data("data.csv")


# @app.route("/")
# def index():
#     return render_template("landing-page.html", stations=stati)


@app.route("/userview/", methods=["POST"])
def user_view():
    data = request.get_json()
    start_station = data.get("start")
    final_station = data.get("final")
    stations[start_station].needs_ramp = True
    stations[final_station].needs_ramp = True


@app.route("/workerview/<line>/<station>")
def worker_view(line, station):
    is_ramp_needed, time = stations[station].needs_ramp
    if time < dt.now():
        stations[station].needs_ramp = (False, None)
        return False
    return is_ramp_needed


if __name__ == "__main__":
    app.run(debug=True)
