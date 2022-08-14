//1. Часы и календарь; //2. Приветствие

const TIME = document.querySelector('.time');
const DATE = document.querySelector('.date');
const GREETING = document.querySelector('.greeting');
const name = document.querySelector('.name');

function getWeekDay() {
    const date = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
};

function showDate() {
    const date = new Date();
    const options = { month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US', options);
    //У  метода toLocaleDateString('en-US', options) два аргумента: язык отображения даты, например 'ru-RU', 'en-US', 'en-Br' 
    //и объект options в котором перечисляются какие параметры даты и в каком представлении нужно отображать.
    DATE.textContent = `${getWeekDay()},  ${currentDate}`;
};


function showGreeting() {
    const date = new Date();
    const hours = date.getHours();//Текущее время в часах возвращает метод getHours()
    const timesOfDayArray = ['morning', 'afternoon', 'evening', 'night'];
    console.log(Math.trunc(hours));
    
    let timeOfDay  = (Math.trunc(hours) > 17) ? timesOfDayArray[2] :
        (Math.trunc(hours) > 11) ? timesOfDayArray[1] :
        (Math.trunc(hours) > 5) ? timesOfDayArray[0] :
        timesOfDayArray[3];


    GREETING.textContent = `Good ${timeOfDay}`;
};

function showTime() {
    const date = new Date();// позволяет  получить текущие дату и время
    const currentTime = date.toLocaleTimeString();//из строки с датой и временем получить только время
    TIME.innerHTML = currentTime; //отобразить внутри элемента 
    showDate();
    getWeekDay();
    showGreeting();
    setTimeout(showTime, 1000);//setTimeout(func, 0) или просто setTimeout(func).
    //Это планирует вызов func настолько быстро, насколько это возможно. 
    //Но планировщик будет вызывать функцию только после завершения выполнения текущего кода.
}

showTime();

//Для сохранения имени пользователя используем хранилище браузера - local storage.

function setLocalStorage() {
  localStorage.setItem('name', name.value);
};

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
};

window.addEventListener('load', getLocalStorage);

//3. Слайдер изображений


//4. Виджет погоды

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind'); 
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

city.addEventListener('change', getWeather);

async function getWeather() {  

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
    humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)}%`;
    weatherDescription.textContent = data.weather[0].description;
}
getWeather();


