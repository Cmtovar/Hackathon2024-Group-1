#!/usr/bin/env python3
from datetime import datetime as dt


class Station:
    def __init__(self, name):
        self.name = name
        self.arrival_times = []
        self.departure_times = []
        needs_ramp: tuple[bool, dt] = (False, None)

    def add_departure_time(self, time):
        self.departure_times.append(time)

    def add_arrival_time(self, time):
        self.arrival_times.append(time)


def load_data(csv_file) -> list[Station]:
    time_format = (
        "%I:%M %p"  # %I for hour (12-hour clock), %M for minutes, %p for AM/PM
    )
    seen_stations = set()
    stations = dict()
    with open(csv_file) as f:
        f.readline()
        for line in f:
            time_str, station_name, direction = line.split(",")
            time_parsed = dt.strptime(time_str, time_format)

            if station_name not in seen_stations:
                stations[station_name] = Station(station_name)

            if direction == "Arrival":
                stations[station_name].add_arrival_time(time_parsed)
            else:
                stations[station_name].add_departure_time(time_parsed)
    return stations.values()


if __name__ == "__main__":
    print(load_data("data.csv"))
