let dayWeak = document.getElementById('dayWeak');
let currentDateNo = document.getElementById('dateNo');
let currentDateMonth = document.getElementById('dateMonth');
let todayLocation = document.getElementById('todayLocation');
let todayTemp = document.getElementById('todayTemp');
let cImageCondition = document.getElementById('cImageCondition');
let weatherDesc = document.getElementById('weatherDesc');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let direction = document.getElementById('direction');
let nDayWeak = document.getElementById('nDayWeak');
let nImageCondition = document.getElementById('nImageCondition');
let nDegree = document.getElementById('nDegree');
let minTemp = document.getElementById('MinTemp');
let nWeatherDesc = document.getElementById('nWeatherDesc');



let nnDayWeak = document.getElementById('nnDayWeak');
let nnImageCondition = document.getElementById('nnImageCondition');
let nnDegree = document.getElementById('nnDegree');
let nminTemp = document.getElementById('nnMinTemp');
let nnWeatherDesc = document.getElementById('nnWeatherDesc');



let btn = document.getElementById('btnId');
let search=document.getElementById('inputLocation');
async function getWeather(city) {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=315c6c254f7141c198c154301243101&q=${city}&days=3&aqi=no&alerts=no`);
    let weatherData = await response.json();
    return weatherData;
}

function displayCurrent(data) {

    

    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    weatherDesc.innerHTML = data.current.condition.text;
    cImageCondition.setAttribute("src", data.current.condition.icon);
    humidity.innerHTML = data.current.humidity + '%';
    wind.innerHTML = data.current.wind_mph + 'Km/h  ';
    direction.innerHTML = data.current.wind_dir;


    let todayDate =new Date();
    dayWeak.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"});
    currentDateNo.innerHTML=todayDate.getDate();
    currentDateMonth.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"});

}
function displayNext(data) {
    const nextDayData = data.forecast.forecastday[1];
    nDayWeak.innerHTML = new Date(nextDayData.date).toLocaleDateString("en-US", { weekday: "long" });
    nDegree.innerHTML = nextDayData.day.maxtemp_c;
    minTemp.innerHTML = nextDayData.day.mintemp_c;
    nWeatherDesc.innerHTML = nextDayData.day.condition.text;
    nImageCondition.setAttribute("src", nextDayData.day.condition.icon);
}

function displayNnext(data) {
    const nextNextDayData = data.forecast.forecastday[2];
    nnDayWeak.innerHTML = new Date(nextNextDayData.date).toLocaleDateString("en-US", { weekday: "long" });
    nnDegree.innerHTML = nextNextDayData.day.maxtemp_c;
    nminTemp.innerHTML = nextNextDayData.day.mintemp_c;
    nnWeatherDesc.innerHTML = nextNextDayData.day.condition.text;
    nnImageCondition.setAttribute("src", nextNextDayData.day.condition.icon);
}


async function arrange(city='cairo') {
    let weatherData = await getWeather(city);
    if (!weatherData.error) {
        displayCurrent(weatherData);
        displayNext(weatherData);
        displayNnext(weatherData);
    }
   
}

arrange();


search.addEventListener("input",function () {
  arrange(search.value)
})