
const locationPrompt = document.getElementById('location-prompt');
const allowLocationBtn = document.getElementById('allow-location');
const locationError = document.getElementById('location-error');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const weatherDisplay = document.getElementById('weather-display');
const locationName = document.getElementById('location-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');


if ('geolocation' in navigator) {
  
  locationPrompt.style.display = 'block';

  
  allowLocationBtn.addEventListener('click', () => {
   
    navigator.geolocation.getCurrentPosition(getWeatherByCoordinates, handleLocationError);
  });
} else {
  
  locationError.style.display = 'block';
}


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchInput.value.trim();
  if (location !== '') {
    getWeatherByLocation(location);
  }
});


function handleLocationError(error) {
  locationPrompt.style.display = 'none';
  locationError.style.display = 'block';
}

function getWeatherByCoordinates(position) {
  const { latitude, longitude } = position.coords;
  const apiKey = 'f3edf7a821749de49e9ac26c6df79cfa'; 
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


function getWeatherByLocation(location) {
  const apiKey = 'f3edf7a821749de49e9ac26c6df79cfa'; 
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


function displayWeatherData(data) {
  const name = data.name;
  const temp = Math.round(data.main.temp - 273.15); 
  const desc = data.weather[0].description;


  locationPrompt.style.display = 'none';
  weatherDisplay.style.display = 'block';
  locationName.textContent = name;
  temperature.textContent = `Temperature: ${temp}°C`;
  description.textContent = `Description: ${desc}`;
}
