 
 

let now = new Date();
 document.querySelector("#minutes").innerHTML = now.getMinutes();
 document.querySelector("#hours").innerHTML = now.getHours();
let minutes = now.getMinutes;
 if (minutes < 10){
     minute = `0${minutes}`;
 }
 let hours = now.getHours;
 if(hours < 10){
     hours = `0${hours}`;
 }


 let days = [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 document.querySelector("#day").innerHTML = days[now.getDay()];





 function showForecast(response){
     document.querySelector("#temper").innerHTML = Math.round( response.data.main.temp);
     document.querySelector("h1").innerHTML = response.data.name;
     
     document.querySelector("#description").innerHTML = response.data.weather[0].description;
     document.querySelector("#humidity").innerHTML = response.data.main.humidity;
     document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
     
 }
 
 
 
 let apiKey = "168e1d15822e79c675ec6a7c184689e9";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

 axios.get(apiUrl).then(showForecast);