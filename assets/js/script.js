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
console.log(fetchButton);

function saveHistory(city) {
  var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
  searchHistory.push(city)
  localStorage.setItem("history", JSON.stringify(searchHistory));
}

function renderHistory() {
  var history = JSON.parse(localStorage.getItem("history")) || [];
  var button = document.createElement("button");
  for (var i = 0; i < history.length; i++) {
    button.textContent= history[i];
    cityHistory.append(button);
  }
  
}

function renderCurrentForecast(data) {
console.log(data);
currentDate.textContent= data.list[0].dt_txt
currentTemp.textContent=`temp: ${data.list[0].main.temp} degrees`
currentWind.textContent= `wind: ${data.list[0].wind.speed} mph`
currentHumidity.textContent= `humidity: ${data.list[0].main.humidity}`
}

function renderFiveDay (data) {
  for (var i=0; i< data.list.length; i= i + 8) {
    var card= document.createElement("div");
    var fiveTemp= document.createElement("p");
    var fiveWind= document.createElement("p");
    var fiveHumidity= document.createElement("p");
    card.setAttribute("class", "col-2 card");
    fiveTemp.textContent= `temp: ${data.list[i].main.temp} degrees`
    fiveWind.textContent= `wind: ${data.list[i].wind.speed} mph`
    fiveHumidity.textContent=`humidity: ${data.list[i].main.humidity}`
    fiveDay.appendChild(card);
    card.appendChild(fiveTemp);
    fiveTemp.append(fiveWind);
    fiveWind.append(fiveHumidity);
  }
}

function getApi(event) {
  event.preventDefault();
  console.log(userInput);
  var queryurl = "http://api.openweathermap.org/data/2.5/forecast?q=" + userInput.value + "&appid=" + APIKey + "&units=imperial";
  console.log(queryurl);
  saveHistory(userInput.value);

  fetch(queryurl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCurrentForecast(data);
      renderFiveDay (data);
      // Input data info
    })
    .catch(function (error) {
      console.log("Requestfailed", error);
    });

  // }
  // .then(function (data) {
  //   for (var i = 0; i < data.length; i++) {
  //       var listItem = document.createElement('li');
  //       listItem.textContent = data[i].html_url;
  //       cityList.appendChild(listItem);
  //     }
  //   });

}

fetchButton.addEventListener('click', getApi);
renderHistory();