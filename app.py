from flask import Flask, jsonify, request, render_template, redirect, url_for
import requests
import random
import datetime
import json

with open("city.list.json", encoding="utf8") as f:
    city_data = json.load(f)

# Get list of city ids
city_ids = [city["id"] for city in city_data]

app = Flask(__name__)
# API endpoint to get weather information for a specific city
@app.route("/weather/<city>", methods=["GET"])
def get_weather(city):

    # API Key for OpenWeatherMap API
    API_KEY = "12379bc0732db02869709dfd89ef6db2"

    # API endpoint for current weather data
    # Using set endpoint to save space, calculation is easier than just calling get_weather twice for each unit
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    # Make API request to get weather data
    response = requests.get(weather_url)

    # Check if API request was successful
    if response.status_code == 200:
        # Parse API response as JSON data
        weather_data = response.json()
        

        # Check if sys key exists in weather_data dictionary
        if 'sys' in weather_data:
            sunrise_local_time = datetime.datetime.fromtimestamp(
                weather_data["sys"]["sunrise"]
            ).strftime("%I:%M %p")
            sunset_local_time = datetime.datetime.fromtimestamp(
                weather_data["sys"]["sunset"]
            ).strftime("%I:%M %p")

            # Get required weather information from API response
            weather = {
                "city": weather_data["name"],
                "country": weather_data["sys"]["country"],
                "country_code": weather_data["sys"]["country"],
                "temperature_celsius": weather_data["main"]["temp"],
                "temperature_fahrenheit": round(
                    (weather_data["main"]["temp"] * 9 / 5) + 32, 2
                ),
                "feels_like_celsius": weather_data["main"]["feels_like"],
                "feels_like_fahrenheit": round(
                    (weather_data["main"]["feels_like"] * 9 / 5) + 32, 2
                ),
                "humidity": weather_data["main"]["humidity"],
                "pressure": weather_data["main"]["pressure"],
                "wind_speed": weather_data["wind"]["speed"],
                "wind_direction": weather_data["wind"].get("deg", "N/A"), # add wind direction/degrees
                "sunrise": sunrise_local_time,
                "sunset": sunset_local_time,
                "description": weather_data["weather"][0]["description"],
                "icon": weather_data["weather"][0]["icon"],
                "cloudiness": weather_data["clouds"]["all"],
            }

        # Return weather information as JSON
        return jsonify({"weather": weather})
    else:
        # Return error message if API request was not successful
        return jsonify({"error": "Failed to get weather information."}), 404

import os

@app.route("/home")
def home():
    # List all files in the static/backgrounds directory
    backgrounds_dir = os.path.join(os.getcwd(), "static", "backgrounds")
    background_files = os.listdir(backgrounds_dir)

    # Randomly select a background image
    random_bg = random.choice(background_files)

    # Check if a city name was specified as a query parameter
    city_name = request.args.get("city")

    if city_name:
        # Use the specified city to get weather information
        weather_info = get_weather(city_name).json.get("weather")
        return render_template("index.html", city=city_name, weather=weather_info, randomBg=random_bg)
    else:
        # If no city is specified, display the index page with placeholders
        weather_info = {
            "city": "Search",
            "country": "",
            "country_code": "",
            "temperature_celsius": 0,
            "temperature_fahrenheit": 0,
            "feels_like_celsius": 0,
            "feels_like_fahrenheit": 0,
            "humidity": 0,
            "pressure": 0,
            "wind_speed": 0,
            "wind_direction": "N/A",
            "sunrise": "00:00 AM",
            "sunset": "00:00 PM",
            "description": "",
            "icon": "",
            "cloudiness": 0,
        }
        return render_template("index.html", city="Search", weather=weather_info, randomBg=random_bg)

@app.route("/")
def index():
    # Check if a city name was specified as a query parameter
    city_name = request.args.get("city")

    if city_name:
        try:
            # Use the specified city to get weather information
            response = get_weather(city_name)
            if response.status_code == 200:
                weather_info = response.json.get("weather")
                return render_template("weather.html", city=city_name, weather=weather_info)
            else:
                # If the response is not successful, redirect to random weather
                return redirect(url_for("get_random_weather"))
        except Exception as e:
            # If any error occurs, redirect to random weather
            return redirect(url_for("get_random_weather"))
    else:
        return redirect(url_for("home"))


@app.route("/weather/random")
def get_random_weather():
    # Choose a random city id from city.list.json
    random_id = random.choice(city_ids)

    # Get the city name for the chosen id
    city_name = next(city["name"] for city in city_data if city["id"] == random_id)

    # Get weather information for the chosen city
    weather_info = get_weather(city_name).json.get("weather")

    # Load the weather template with the weather information
    return render_template("weather.html", city=city_name, weather=weather_info, country_code=weather_info["country"])


# Route to HTML template to display weather information
@app.route("/weather")
def weather():
    return render_template("weather.html")

@app.route("/cities")
def cities():
    total_cities = len(city_data)
    current_count = request.args.get("count", default=5, type=int)
    
    # List all files in the static/backgrounds directory
    backgrounds_dir = os.path.join(os.getcwd(), "static", "backgrounds")
    background_files = os.listdir(backgrounds_dir)

    # Randomly select a background image
    random_bg = random.choice(background_files)

    return render_template("city.html", cities=city_data, current_count=current_count, total_cities=total_cities, randomBg=random_bg)

# Run the server
if __name__ == "__main__":
    app.run()
