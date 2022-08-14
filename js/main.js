const TIME = document.querySelector('.time');

function showTime() {
    const DATE = new Date();// позволяет  получить текущие дату и время
    const currentTime = DATE.toLocaleTimeString();//из строки с датой и временем получить только время
    TIME.innerHTML = currentTime; //отобразить внутри элемента dhtvz
}

setInterval(showTime, 1000);//Принимает функцию и второй параметр - интервал, через который запускает функцию

 


