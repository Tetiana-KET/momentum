const TIME = document.querySelector('.time');

function showTime() {
    const DATE = new Date();// позволяет  получить текущие дату и время
    const currentTime = DATE.toLocaleTimeString();//из строки с датой и временем получить только время
    TIME.innerHTML = currentTime; //отобразить внутри элемента 
    setTimeout(showTime, 0);//setTimeout(func, 0) или просто setTimeout(func).
    //Это планирует вызов func настолько быстро, насколько это возможно. 
    //Но планировщик будет вызывать функцию только после завершения выполнения текущего кода.
}

showTime();

 


