from flask import Flask, request, redirect, url_for
from datetime import datetime

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


@app.route("/workerview/<line>/<station>")
def worker_view(line, station):
    # TODO return a boolean to indicate whether the worker should place the ramp
    pass


if __name__ == "__main__":
    app.run(debug=True)
