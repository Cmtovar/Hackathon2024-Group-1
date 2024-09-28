#!/usr/bin/env python3
import datetime.datetime as dt


class Station:
    def __init__(self, name):
        self.name = name
        self.arrival_times = []
        self.departure_times = []

    def add_departure_time(self, time):
        self.departure_times.append(time)

    def add_arrival_time(self, time):
        self.arrival_times.append(time)


def load_data(csv_file):
    time_format = (
        "%I:%M %p"  # %I for hour (12-hour clock), %M for minutes, %p for AM/PM
    )
    stations = set()
    timetables = dict()
    with open(csv_file) as f:
        f.readline()
        for line in f:
            time_str, station, direction = line.split(",")
            stations.add(station)
            timetables[station] = dt.strptime(time_str, time_format)
