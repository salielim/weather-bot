// Geolocation
geoFindMe();
function geoFindMe() {
  var output = document.getElementById("location");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

    function success(position) {
      latitude  = position.coords.latitude;
      longitude = position.coords.longitude;
      getWeatherCelsius();

    output.innerHTML = '<p>Latitude: ' + latitude + '° <br>Longitude: ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=150x150&sensor=false";

    output.appendChild(img);
    }
    
    function error() {
      output.innerHTML = "Unable to retrieve your location";
  }
 
  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

// Weather in  celsius
getWeatherCelsius();
function getWeatherCelsius() {
  api = 'http://api.openweathermap.org/data/2.5/weather?';
  apiKey = '88f49554b1890b29f76f9ed8d85600af';
  var units = '&units=metric';
  var url = api + 'lat=' + latitude + '&lon=' + longitude + '&APPID=' + apiKey + units;

  xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  var data = JSON.parse(xhr.response);
  var weatherData = data.weather[0].main;
  var tempData = data.main.temp;
  var iconData = data.weather[0].icon;
  showWeather(weatherData);
  showTempCelsius(tempData);
  showIcon(iconData);
}

// Weather in fahrenheit
function getWeatherFahrenheit() {
  var units = '&units=imperial'
  var url = api + 'lat=' + latitude + '&lon=' + longitude + '&APPID=' + apiKey + units;

  xhr.open('GET', url, false);
  xhr.send();
  var data = JSON.parse(xhr.response);
  var tempData = data.main.temp;
  showTempFahrenheit(tempData);
}
  
function showWeather(weather) {	        
  document.getElementById('weather').innerHTML = weather;
}

function showIcon(icon) {	        
  document.getElementById('icon').innerHTML = '<img src=\"http://openweathermap.org/img/w/' + icon + '.png\">';
}

function showTempCelsius(temp) {	        
  document.getElementById('temp').innerHTML = temp + '°C';
}

function showTempFahrenheit(temp) {	        
  document.getElementById('temp').innerHTML = temp + '°F';
}