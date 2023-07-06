// var cityList = document.querySelector('ul');
var fetchButton = document.getElementById("fetch-button");
var APIKey= "9e204c5eab145a0a3bf0c1df038cb8d5";
var city;
var userInput= document.getElementById("query");
console.log(userInput);
console.log(fetchButton);

function getApi(event) {
event.preventDefault();
var queryurl= "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey;
var forecastUrl= "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + APIKey;
console.log(queryurl);
console.log(forecastUrl);

fetch(queryurl)
    .then(function(response) {
    return response.json();
    })
    .then(function (data) {
      // Input data info
   return fetch(data.forecastUrl);
    })
    .then (function(response) {
      return response.json();
    })
    .then(function(data) {
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