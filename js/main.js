//Подключаем файл c музыкой в index.js, 
//при подключении js-файла с импортом, необходимо указать type="module"
import playList from './playList.js';


//1. Часы и календарь
const TIME = document.querySelector('.time');
const DATE = document.querySelector('.date');
const GREETING = document.querySelector('.greeting');
const name = document.querySelector('.name');
const BODY = document.body;

function showTime () {
    const date = new Date(); //Mon Feb 20 2023 08:47:47 GMT+0200 
    const currentTime = date.toLocaleTimeString(); //08:47:47
    TIME.innerHTML = currentTime;
    showDate ();
    showGreeting();
    setTimeout(showTime, 1000);
}
showTime ();

function getWeekDay () {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

function showDate () {
    const date = new Date();
    const locale = 'en-US';
    const options = {month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(locale, options);
    DATE.textContent = `${getWeekDay()}, ${currentDate}`;
}

//2. Приветствие


function getTimeOfDay () {
    const date = new Date();
    const hours = date.getHours(); // Определить текущее время в часах - 10
    const TimesOfDay = ['morning', 'afternoon', 'evening', 'night'];
    let TimeOfDay = hours < 5 ? TimesOfDay[3] :
                    hours < 12 ? TimesOfDay[0] :
                    hours < 18 ? TimesOfDay[1] :
                    TimesOfDay[2] ;
    return TimeOfDay;
    
}

function showGreeting() {
    GREETING.textContent = `Good ${getTimeOfDay()}`
}

//При перезагрузке страницы приложения имя пользователя сохраняется
//перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить
function setLocalStorage () {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);
//перед загрузкой страницы (событие load) данные нужно восстановить и отобразить
function getLocalStorage () {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    getWeather();
}
window.addEventListener('load', getLocalStorage);

//3. Слайдер изображений
const NextSlide = document.querySelector('.slide-next');
const PrevSlide = document.querySelector('.slide-prev');

NextSlide.addEventListener('click', getSlideNext);
PrevSlide.addEventListener('click', getSlidePrev);

let randomNum;

function getRandomNum() {
    randomNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1; //Максимум и минимум включаются
}
getRandomNum();

function setBackground () {
    let timeOfDay = getTimeOfDay();
    let bgNum = randomNum.toString().padStart(2, 0);
    const img = new Image;
    img.src = `https://raw.githubusercontent.com/tetiana-ket/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        BODY.style.background = `url(${img.src})`;
    }
}

setBackground ();
function getSlideNext () {
    randomNum++;
    if (randomNum === 21) {
        randomNum = 1;
    };
    setBackground();
}

function getSlidePrev () {
    randomNum--;
    if (randomNum === 0) {
        randomNum = 20;
    };
    setBackground();
}

//4. Виджет погоды
const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind'); 
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=118c2a999ced002e8a6260019fb3347c&units=metric`
    //units=metric - температура в градусах Цельсия (можно указать units=imperial для отображения температуры в градусах Фаренгейта)
    const response = await fetch(url);//получаем данные с сервера по ссылке
    const data = await response.json(); //присваеваем в переменную ответ от сервера в формате json
    // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

    if (response.ok) {
        showWeather(data);
        weatherError.innerHTML = '';
    } else {
        weatherError.innerHTML = `Error! ${data.message} for "${city.value}"`;
        city.value = '';
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
        weatherDescription.textContent = '';
    }
}
getWeather();

function showWeather (data) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} м/с`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
    weatherDescription.textContent = data.weather[0].description;
}

city.addEventListener('change', getWeather);

//5. Виджет "цитата дня"
async function getQuotes() {  
    // const quotesUrl = 'quotesRu.json';
    const quotesUrl = `https://type.fit/api/quotes`;
    const response = await fetch(quotesUrl);
    const data = await response.json();     
    showQuote (data);
}
getQuotes();

function showQuote (data) {
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    let randomIndex = Math.floor(Math.random() * data.length);
    quote.textContent = data[randomIndex].text;
    author.textContent = data[randomIndex].author;
}

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes);

//6. Аудиоплеер
{
    const player = document.querySelector('.player');
    const prevTrack = document.querySelector('.play-prev');
    const nextTrack = document.querySelector('.play-next');
    const playPauseButton = document.querySelector('.play');
    const playListLIST = document.querySelector('.play-list');    
    const ProgressContainer = document.querySelector('.progress-container');
    const prosress = document.querySelector('.prosress');
    const currentSongTitle = document.querySelector('.current-song-title');
    const currentTimer = document.querySelector('.current-time');
    const songDuration = document.querySelector('.song-duration');
    const volumeBTN = document.querySelector('.volume-btn');
    const volumeProgressContainer = document.querySelector('.volume-progress-container');
    const volumeProgress = document.querySelector('.volume-progress');
    let currentSong = 0;//Песня по умолчанию
    let currentVolume = .1;
    const audio = new Audio();
    
    // CREATE PLAY LIST
    playList.forEach((track, index) => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = `${track.title}`;
        playListLIST.append(li);
    }); 

    const playListItems = Array.from(document.querySelectorAll('.play-item'));

    playListItems.forEach( (item, index, array) => {

        item.addEventListener('click', () => {
            const isActive = item.classList.contains('item-active');
            currentSong = array.indexOf(event.target);//GET INDEXT OF CLICKED SONG
            if (isActive) {
                playListItems[currentSong].classList.remove('item-active')
                pauseAudio();   
            } else {
                playListItems[currentSong].classList.add('item-active')
                setSong();
                playAudio();
            }
        });
    })
    
    function setSong () {
        audio.src = playList[currentSong].src;
        currentSongTitle.innerHTML = playList[currentSong].title;
        songDuration.innerHTML = playList[currentSong].duration;
        audio.currentTime = 0;   
        unSetActiveSong ();
    }
    setSong ();

    function unSetActiveSong () {
        playListItems.forEach((item) => {
            item.classList.remove('item-active')
        })
    }

    function setActiveSong () {
        playListItems.forEach((item) => {
            if (item.textContent === currentSongTitle.textContent) {
                item.classList.add('item-active')
            }
        })
    }

    function playAudio () {
        player.classList.add('playing');
        playPauseButton.classList.add('pause');
        audio.play();
        setActiveSong ();
    }
    
    function pauseAudio() {
        player.classList.remove('playing');
        playPauseButton.classList.remove('pause');
        audio.pause();
        unSetActiveSong ();
    }

    function makeMusicOnOff () {
        const isPlaying = player.classList.contains('playing');

        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();  
        }
    }

    function playPrevTrack () {
        if (currentSong === 0) {
            currentSong = playList.length -1;
        } else {
            currentSong--
        }
        unSetActiveSong();
        setSong();
        playAudio();
    }

    function playNextTrack () {
        if (currentSong === playList.length -1) {
            currentSong = 0;
        } else {
            currentSong++
        }
        unSetActiveSong();
        setSong();
        playAudio();
    }

    playPauseButton.addEventListener('click', makeMusicOnOff);
    prevTrack.addEventListener('click', playPrevTrack);
    nextTrack.addEventListener('click', playNextTrack);

    //progress playing

    function showPlayingProcess (event) {
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        const progressProgress = (currentTime / duration) * 100;
        prosress.style.width = `${progressProgress}%`;
        currentTimer.textContent = `${Math.trunc(parseInt(currentTime/60)).toString().padStart(2,'0')}:${(parseInt(audio.currentTime)%60).toString().padStart(2,'0')} / `;
    }

    audio.addEventListener('timeupdate', showPlayingProcess);

    function setCurrentPlayingTime (event) {
        const width = this.clientWidth;
        const progressClickX = event.offsetX;
        const duration = audio.duration;
        audio.currentTime = (progressClickX / width) * duration;  
    }

    ProgressContainer.addEventListener('click', setCurrentPlayingTime);

    // auto play

    audio.addEventListener('ended', playNextTrack);

    // VOLUME volume-btn-muted

    volumeBTN.addEventListener('click', setVolumeMuteOrUnmute);

    function setVolumeMuteOrUnmute () {
        if(audio.muted) {
            audio.muted = false
            volumeBTN.classList.remove('volume-btn-muted');
        } else {
            audio.muted = true
            volumeBTN.classList.add('volume-btn-muted');
        };
    };

    // CHANGE VOLUME
    
    volumeProgressContainer.addEventListener('click', changeVolume);

    function setVolume (event) {
        volumeProgress.style.width = currentVolume * 100 + '%';
        audio.volume = 0.1;
    }
    setVolume ();

    function changeVolume (event) {
        currentVolume = event.offsetX / parseInt(window.getComputedStyle(volumeProgressContainer).width);
        audio.volume = currentVolume;
        volumeProgress.style.width = currentVolume * 100 + '%';
    }
    
}