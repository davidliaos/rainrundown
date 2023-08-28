## rainrundown
**Fullstack Weather App using HTML, Python, Flask, JavaScript**

A project I started to learn about RESTful APIs and my first Web Development project. Started this in Winter 2022, finishing it Summer 2023 to submit for CS50. I didn't really care for most of the current weather websites, which feel extremely cluttered and wanted to make something more minimal and give it my own spin.

**Dependencies:**
- User must get their own API key from [OpenWeatherMaps](https://openweathermap.org/api).
- This project depends heavily on a `city.list.json` file provided by OpenWeatherMaps. A `city.list.json` file is provided in the project but it only contains two cities. If you want full functionality you must replace this file. Download options can be found [here](https://bulk.openweathermap.org/sample/). Direct download of the json used when coding is available [here](https://bulk.openweathermap.org/sample/city.list.json.gz).

### File Descriptions:

1. **app.py**: 
   - This is the main application file written in Python. It sets up the Flask server, defines routes, and handles the backend logic for fetching weather data using the OpenWeatherMaps API.
   - Contains functions to handle user requests and render the appropriate HTML templates with the fetched weather data.

2. **city.list.json**:
   - A JSON file that contains a list of cities. The provided file in the project contains only two cities for demonstration purposes.
   - This file is essential for the application to fetch weather data for specific cities. For full functionality, it's recommended to replace this file with the complete list from OpenWeatherMaps.

3. **styles.css**:
   - Contains the CSS styles for the web application. It defines the look and feel of the application, ensuring a clean and minimalistic design as intended by the creator.

4. **weather.js**:
   - A JavaScript file that handles the dynamic functionality on the frontend. It interacts with the application, updates the displayed weather data, and provides interactivity to the user. Mainly used to impliment reactive design elements to the page.

5. **weather.html**:
   - Displays the fetched weather details for the selected city. It presents the data in a structured and readable format, ensuring users get the information they need without any clutter.
