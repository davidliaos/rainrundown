function getWeather(city) {
  // Make API request to server to get weather data
  fetch('/weather/' + city)
    .then(response => response.json())
    .then(data => {
      // Update UI with weather data
      const weather = data.weather[0];
      document.getElementById('city').textContent = weather.city;
      document.getElementById('description').textContent = weather.description;
      document.getElementById('temperature').textContent = weather.temperature_celsius + '°C';
      document.getElementById('feels-like').textContent = 'Feels like ' + weather.feels_like_celsius + '°C';
      document.getElementById('humidity').textContent = 'Humidity: ' + weather.humidity + '%';
      document.getElementById('wind').textContent = 'Wind: ' + weather.wind_speed + ' m/s, ' + weather.wind_direction + '°';
      document.getElementById('sunrise').textContent = 'Sunrise: ' + new Date(weather.sunrise * 1000).toLocaleTimeString();
      document.getElementById('sunset').textContent = 'Sunset: ' + new Date(weather.sunset * 1000).toLocaleTimeString();
      document.getElementById('icon').src = 'http://openweathermap.org/img/w/' + weather.icon + '.png';
      document.getElementById('weather-info').style.display = 'block';

      // Set the background image based on the weather description
      let backgroundImage;
      console.log(backgroundImage + weather.description);
      if (weather.description === "clear skies") {
        backgroundImage = "https://cdn.discordapp.com/attachments/1062620512095846493/1082152972617797642/clear_sky.png";
        console.log("clear_sky");
      } else if (weather.description === "volcanic ash") {
        backgroundImage = "https://cdn.discordapp.com/attachments/1062620512095846493/1082153013143162880/volcanic_ash.png";
        console.log("volcanic_ash");
      } else if (weather.description === "thunderstorm") {
        backgroundImage = "https://cdn.discordapp.com/attachments/1062620512095846493/1082153012237189180/thunderstorm.png";
        console.log("thunderstorm");
      } else if (weather.description === "light snow") {
        backgroundImage = "https://cdn.discordapp.com/attachments/1062620512095846493/1082152975809662996/light_snow.png";
        console.log("light_snow");
      } else if (weather.description === "scattered clouds"){
        backgroundImage = "scattered_clouds.png";
        console.log("scattered_clouds");
      } else if (weather.description === "fog") {
        backgroundImage = "https://cdn.discordapp.com/attachments/1062620512095846493/1082152973905449092/fog.png";
        console.log("fog");
      } else if (weather.description === "mist") {
        backgroundImage = "https://cdn.discordapp.com/attachments/1062620512095846493/1082153010664329246/mist.png";
        console.log("mist");
      } else if (weather.description === "moderate rain") {
        backgroundImage = "https://cdn.discordapp.com/attachments/1062620512095846493/1082153011482202142/moderate_rain.png";
        console.log("moderate_rain");
      } else if (weather.description === "overcast clouds") {
          backgroundImage = "https://cdn.discordapp.com/attachments/1062620512095846493/1082152973406314496/few_clouds.png";
          console.log("few_clouds");
        } else if (weather.description === "heavy shower") {
          backgroundImage = "https://cdn.discordapp.com/attachments/1062620512095846493/1082152974387789944/heavy_rain.png";
          console.log("heavy_shower");
        } else {
          backgroundImage = "https://cdn.discordapp.com/attachments/1062620512095846493/1082152973406314496/few_clouds.png";
          console.log("default");
        }      
        
        document.body.style.backgroundImage = "url('" + backgroundImage + "')";
        
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to get weather information');
      });
  }

  document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const city = document.getElementById('search-input').value;
    if (city) {
      getWeather(city);
    }
  });
