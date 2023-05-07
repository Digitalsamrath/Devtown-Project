// JavaScript code for the Weather Search Application

// Get DOM elements
const locationPrompt = document.getElementById('location-prompt');
const allowLocationBtn = document.getElementById('allow-location');
const locationError = document.getElementById('location-error');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const weatherDisplay = document.getElementById('weather-display');
const locationName = document.getElementById('location-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

// Check if geolocation is supported by the browser
if ('geolocation' in navigator) {
  // Display location access prompt
  locationPrompt.style.display = 'block';

  // Event listener for "Allow Location Access" button
  allowLocationBtn.addEventListener('click', () => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(getWeatherByCoordinates, handleLocationError);
  });
} else {
  // Geolocation is not supported
  locationError.style.display = 'block';
}

// Event listener for search form submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchInput.value.trim();
  if (location !== '') {
    getWeatherByLocation(location);
  }
});

// Function to handle location access error
function handleLocationError(error) {
  locationPrompt.style.display = 'none';
  locationError.style.display = 'block';
}

// Function to get weather data by coordinates
function getWeatherByCoordinates(position) {
  const { latitude, longitude } = position.coords;
  const apiKey = 'f3edf7a821749de49e9ac26c6df79cfa'; // Replace with your OpenWeatherMap API key
  const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to get weather data by location name
function getWeatherByLocation(location) {
  const apiKey = 'f3edf7a821749de49e9ac26c6df79cfa'; // Replace with your OpenWeatherMap API key
  const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to display weather data
function displayWeatherData(data) {
  const name = data.name;
  const temp = Math.round(data.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
  const desc = data.weather[0].description;

  // Display weather data
  locationPrompt.style.display = 'none';
  weatherDisplay.style.display = 'block';
  locationName.textContent = name;
  temperature.textContent = `Temperature: ${temp}°C`;
  description.textContent = `Description: ${desc}`;
}
