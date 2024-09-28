from flask import Flask, request, redirect, url_for
from datetime import datetime
import sqlite3

app = Flask(__name__)


# @app.route("/")
# def index():
#     return render_template("landing-page.html", stations=stati)


@app.route("/userview/<station>", methods=["GET", "POST"])
def user_view(station):
    if request.method == "POST":
        pass
    pass


# @app.route("/success")
# def success():
#     return render_template("success.html")


@app.route("/workerview/<line>/<station>")
def worker_view(line, station):
    pass


@app.template_filter("format_datetime")
def format_datetime(value, format="%Y-%m-%d %H:%M:%S"):
    if value is None:
        return ""
    return datetime.strptime(value, "%Y-%m-%d %H:%M:%S").strftime(format)


if __name__ == "__main__":
    app.run(debug=True)
