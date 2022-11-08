// Get all the necessary elements from the DOM
const app = document.querySelector('.weather-app');
const temp =  document.querySelector('.temp');
const dateOutput =  document.querySelector('.date');
const timeOutput =  document.querySelector('.time');
const conditionOutput =  document.querySelector('.condition');
const nameOutput =  document.querySelector('.name');
const icon =  document.querySelector('.icon');
const cloudOutput =  document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOUtput = document.querySelector('.wind');
const form = document.querySelector('.form');
const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const cities = document.querySelector('cities')


// Default city when the page loads
let cityInput = "Bengaluru";

// Add click event to each city in the panel
cities.forEach((city => { 
    city.addEventListener('click', (e) => {
        //change from default city to clicked one
        cityInput = e.target.innerHTML;
        //function that fetches and dispplays all the data from weather API
        fetchWeatherData();
        //Fade out the app (simple Animation)
        app.style.opacity = "0";
    });
})) // doubt of purple bracket

//Add submit event to the form
form.addEventListener('submit', (e) => {
/* if the input field(search bar) is empty, throw an alert*/
if(search.value.length == 0){
alert('Please type your city name');
} else{
    //change from default to one in input
    cityInput = search.value;
    //function that fetches all data from weather API
    fetchWeatherData();
    //remove all text from input
    search.value = "";
    //fade out the app(simple animation)
    app.style.opacity = "0";
}

//prevents the default behaviour of form
e.preventDefault();
});

//function that return day of week
function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",

    ];
    return weekday[new Date('${day}/${month}/${year}').getDay()];
};

//function for weather API data fetching
function fetchWeatherData() {
    //fetch the data and dynamically add the city name with template literals (Use your own key)
    fetch('http://api.weather.com/v1/current.json?key= /*use your key*/ =${cityInput}')
   

// take data which is in json format and convert to reguler js
.then(Response => Response.json())
.then(data => {
    console.log(data);

    //lets start by adding the temp and weather condition to pages
    temp.innerHTML = data.current.temp_c + "&#176;"
    conditionOutput.innerHTML = data.current.condition.text;

    //get the date and time from city and extract
    const date = data.location.locationtime;
    const y = parseInt(date.substr(0, 4));
    const m = parseInt(date.substr(5, 2));
    const d = parseInt(date.substr(8, 2));
    const time = date.substr(11);

    dateOutput.innerHTML = '${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}'
    timeOutput.innerHTML = time;
    nameOutput.innerHTML = data.location.name;
    const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64*64/".length);
        icon.src = "./icons/" + iconId;

        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOUtput.innerHTML = data.current.wind_kph + "km/h";

        let timeOfDay = "day";

        const code = data.current.condition.code;

        if(data.current.is_day) {
            timeOfDay = "night";
        }

        if(code == 1000) {
            app.style.backgroundImage = 'url(https://images.unsplash.com/photo-1528353518104-dbd48bee7bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80)';
            btn.style.background = "#e5ba92";
            if(timeOfDay == "night") {
                btn.style.background = "#181e27";
            }
        }
    
})
}


