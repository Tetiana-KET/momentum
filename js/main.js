//1. Часы и календарь; //2. Приветствие

const TIME = document.querySelector('.time');
const DATE = document.querySelector('.date');
const GREETING = document.querySelector('.greeting');

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

    
    let timeOfDay  = (Math.trunc(hours) > 18) ? timesOfDayArray[2] :
        (Math.trunc(hours) > 12) ? timesOfDayArray[1] :
        (Math.trunc(hours) > 6) ? timesOfDayArray[0] :
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
    setTimeout(showTime, 0);//setTimeout(func, 0) или просто setTimeout(func).
    //Это планирует вызов func настолько быстро, насколько это возможно. 
    //Но планировщик будет вызывать функцию только после завершения выполнения текущего кода.
}

showTime();







 


