const TIME = document.querySelector('.time');
const DATE = document.querySelector('.date');


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


function showTime() {
    const date = new Date();// позволяет  получить текущие дату и время
    const currentTime = date.toLocaleTimeString();//из строки с датой и временем получить только время
    TIME.innerHTML = currentTime; //отобразить внутри элемента 
    showDate();
    getWeekDay();
    setTimeout(showTime, 0);//setTimeout(func, 0) или просто setTimeout(func).
    //Это планирует вызов func настолько быстро, насколько это возможно. 
    //Но планировщик будет вызывать функцию только после завершения выполнения текущего кода.
}

showTime();




 


