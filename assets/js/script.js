// var cityList = document.querySelector('ul');
var fetchButton = document.getElementById("fetch-button");
var APIKey = "9e204c5eab145a0a3bf0c1df038cb8d5";
var city;
var userInput = document.getElementById("query");
var cityHistory = document.getElementById("city-history");
var currentDate= document.getElementById("date");
var currentTemp= document.getElementById("temp");
var currentWind= document.getElementById("wind");
var currentHumidity= document.getElementById("humid");
var fiveDay= document.getElementById("five-day");
var chosenCity= document.getElementById("chosen-city");
console.log(fetchButton);

// saving in local storage
function saveHistory(city) {
  var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
  searchHistory.push(city)
  localStorage.setItem("history", JSON.stringify(searchHistory));
}

// getting history from local storage and placing on page
function renderHistory() {
  var history = JSON.parse(localStorage.getItem("history")) || [];
  var button = document.createElement("button");
  for (var i = 0; i < history.length; i++) {
    button.textContent= history[i];
    cityHistory.append(button);
  }
  
}

// obtains data for current day
function renderCurrentForecast(data) {
console.log(data);
chosenCity.textContent= data.city.name;
currentDate.textContent= data.list[0].dt_txt
currentTemp.textContent=`temp: ${data.list[0].main.temp} degrees`
currentWind.textContent= `wind: ${data.list[0].wind.speed} mph`
currentHumidity.textContent= `humidity: ${data.list[0].main.humidity} %`
}

// five day forecast
function renderFiveDay (data) {
  for (var i=0; i< data.list.length; i= i + 8) {
    var card= document.createElement("div");
    var fiveDate= document.createElement("p");
    var fiveTemp= document.createElement("p");
    var fiveWind= document.createElement("p");
    var fiveHumidity= document.createElement("p");
    card.setAttribute("class", "col-2 card");
    fiveDate.textContent= data.list[i].dt_txt;
    fiveTemp.textContent= `temp: ${data.list[i].main.temp} degrees`
    fiveWind.textContent= `wind: ${data.list[i].wind.speed} mph`
    fiveHumidity.textContent=`humidity: ${data.list[i].main.humidity} %`
    fiveDay.appendChild(card);
    card.appendChild(fiveDate);
    fiveDate.append(fiveTemp);
    fiveTemp.append(fiveWind);
    fiveWind.append(fiveHumidity)

  }
}

// function with API urls
function getApi(event) {
  event.preventDefault();
  console.log(userInput);
  var queryurl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput.value + "&appid=" + APIKey + "&units=imperial";
  console.log(queryurl);
  saveHistory(userInput.value);

  fetch(queryurl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCurrentForecast(data);
      renderFiveDay (data);
    })
    .catch(function (error) {
      console.log("Requestfailed", error);
    });
}

// fetch button starts the function call
fetchButton.addEventListener('click', getApi);
renderHistory();