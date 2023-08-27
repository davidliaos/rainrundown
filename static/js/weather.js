function getWeather(city, images) {
  // Make API request to server to get weather data
  fetch('/weather/' + city)
    .then(response => response.json())
    .then(data => {

      const weather = data.weather;

      const flagImg = document.getElementById('country-flag');
      const countryCode = data.weather.country_code;
      if (countryCode) {
          flagImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
          flagImg.onerror = function() {
              console.error("Error loading flag image.");
              flagImg.style.display = 'none'; // Hide the flag image if there's an error
          };
      } else {
          flagImg.style.display = 'none'; // Hide the flag image if country code is not available
      }

      // Set the background image based on the weather description
      console.log(data.weather.description.replace(/ /g, "_"));
      let imageURL = '';
      for (let image of images) if (image.includes(data.weather.description.replace(/ /g, "_"))) imageURL = image;
      if (imageURL === '') imageURL = images[0];
      
      document.querySelector('body').style.background = "url('" + imageURL + "')";
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to get weather information');
    });
}

function toggleStar() {
  const starButton = document.getElementById('star-button');
  const starPath = document.getElementById('star-path');
  const cityName = document.querySelector('.city-container h1').textContent;

  if (starButton.classList.contains('active')) {
    starButton.classList.remove('active');
    starPath.setAttribute('fill', 'none'); // Unfilled star
    starPath.setAttribute('stroke', 'currentColor');
    starPath.setAttribute('stroke-width', '2');
    removeCity(cityName);
    showSavedCities();
  } else {
    starButton.classList.add('active');
    starPath.setAttribute('fill', 'currentColor'); // Filled star
    starPath.removeAttribute('stroke');
    starPath.removeAttribute('stroke-width');
    saveCity(cityName);
    showSavedCities();
  }
}


function showSavedCities() {
  const dropdown = document.getElementById('saved-cities-dropdown');
  const savedCities = getSavedCities();

  // Clear the dropdown
  dropdown.innerHTML = '';

  // Populate the dropdown with saved cities
  savedCities.forEach(city => {
    const cityDiv = document.createElement('div');
    cityDiv.className = 'saved-city';
    cityDiv.innerHTML = `<a href="/?city=${encodeURIComponent(city)}">${city}</a>`;
    dropdown.appendChild(cityDiv);
  });

  // Toggle the dropdown display
  if (dropdown.style.display === 'none') {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
}


// Helper function to get saved cities from localStorage
function getSavedCities() {
  const savedCities = localStorage.getItem('savedCities');
  return savedCities ? JSON.parse(savedCities) : [];
}

// Helper function to save a city to localStorage
function saveCity(cityName) {
  const savedCities = getSavedCities();
  if (!savedCities.includes(cityName)) {
    savedCities.push(cityName);
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
  }
}

// Helper function to remove a city from localStorage
function removeCity(cityName) {
  const savedCities = getSavedCities();
  const index = savedCities.indexOf(cityName);
  if (index !== -1) {
    savedCities.splice(index, 1);
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
  }
}

function toggleStar() {
  const starButton = document.getElementById('star-button');
  const cityName = document.querySelector('.city-container h1').textContent; // Assuming the city name is inside an h1 tag in the city-container

  if (starButton.classList.contains('active')) {
    starButton.classList.remove('active');
    removeCity(cityName);
    showSavedCities(); // Update the sidebar after removing a city
  } else {
    starButton.classList.add('active');
    saveCity(cityName);
    showSavedCities(); // Update the sidebar after adding a city
  }
}
// Checks if city is already saved for consistency with the star.
function updateStarState(cityName) {
  const starButton = document.getElementById('star-button');
  const starPath = document.getElementById('star-path');
  const savedCities = getSavedCities();

  if (savedCities.includes(cityName)) {
    starButton.classList.add('active');
    starPath.setAttribute('fill', 'currentColor'); // Filled star
    starPath.removeAttribute('stroke');
    starPath.removeAttribute('stroke-width');
  } else {
    starButton.classList.remove('active');
    starPath.setAttribute('fill', 'none'); // Unfilled star
    starPath.setAttribute('stroke', 'currentColor');
    starPath.setAttribute('stroke-width', '2');
  }
}

function toggleTemperatureUnits() {
  var tempC = document.querySelector("#temperature-celsius");
  var tempF = document.querySelector("#temperature-fahrenheit");
  var feelsLikeC = document.querySelector("#feels-like-celsius");
  var feelsLikeF = document.querySelector("#feels-like-fahrenheit");
  var tempToggleBtn = document.querySelector("#temperature-toggle");

  if (tempToggleBtn.textContent === "°C") {
      tempC.style.display = "none";
      tempF.style.display = "inline-block";
      feelsLikeC.style.display = "none";
      feelsLikeF.style.display = "inline-block";
      tempToggleBtn.textContent = "°F";
  } else {
      tempC.style.display = "inline-block";
      tempF.style.display = "none";
      feelsLikeC.style.display = "inline-block";
      feelsLikeF.style.display = "none";
      tempToggleBtn.textContent = "°C";
  }
}

// Check if the current city is saved when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const cityName = document.querySelector('.city-container h1').textContent;
  updateStarState(cityName);
});

getWeather(city, images)
