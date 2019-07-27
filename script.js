const dataFile =     [
    {
        date: 1559419200000,
        temperature: {
            night: 16,
            day: 26,
        },
        cloudiness: 'ясно',
        snow: false,
        rain: false,
    },
    {
        date: 1559505600000,
        temperature: {
            night: 19,
            day: 29,
        },
        cloudiness: 'облачно',
        snow: false,
        rain: true,
    },
    {
        date: 1559592000000,
        temperature: {
            night: 12,
            day: 21,
        },
        cloudiness: 'облачно',  // 86400000
        snow: false,
        rain: false,
    },
        {
        date: 1559678400000,
        temperature: {
            night: 19,
            day: 29,
        },
        cloudiness: 'облачно',
        snow: false,
        rain: true,
    },
    {
        date: 1559847600000,
        temperature: {
            night: 12,
            day: 21,
        },
        cloudiness: 'облачно',
        snow: false,
        rain: false,
    },
];



(function () {
    let position = 0;
    let maxPos = -512;
    let minPos = 0;
    let container = document.querySelector('.slider-container');
    let buttonRight = document.querySelector('.slider-right');
    let buttonLeft = document.querySelector('.slider-left');
    buttonLeft.disabled = true;

    const sliderRight = function() {
        position = position - 256;
        container.style.transform = 'translateX(' + position + 'px)';
    };

    const sliderLeft = function() {
        position = position + 256;
        container.style.transform = 'translateX(' + position + 'px)';
    };

    buttonRight.addEventListener('click', function() {
        sliderRight();
        if (position < minPos) {
            buttonLeft.disabled = false;
        }
        if (position <= maxPos) {
            buttonRight.disabled = true;
        }
    });
    buttonLeft.addEventListener('click', function() {
        sliderLeft();
        if (position >= minPos) {
            buttonLeft.disabled = true;
        }
        if (position > maxPos) {
            buttonRight.disabled = false;
        }
    });
    const itemFiller = function() {
        let dayList = document.querySelectorAll('.item-day');
        let dateList = document.querySelectorAll('.item-date');
        let imageList = document.querySelectorAll('.item-image');
        let tDayList = document.querySelectorAll('.item-tempDay');
        let tNightList = document.querySelectorAll('.item-tempNight');
        let cloudList = document.querySelectorAll('.item-cloud');
        let rainList = document.querySelectorAll('.item-rain');
        for (let i = 0; i< dayList.length; i++) {
            let newImg = document.createElement('img');
            let date = dataFile[i].date;
            let dayFormatter = new Intl.DateTimeFormat('ru', {
                weekday: "long"
            });
            let dateFormatter = new Intl.DateTimeFormat('ru', {
                month: "long",
                day: "numeric"
            });
            dayList[i].innerHTML = dayFormatter.format(date);
            dateList[i].innerHTML = dateFormatter.format(date);
            tDayList[i].innerHTML = 'днём +' + dataFile[i].temperature.day + '°';
            tNightList[i].innerHTML = 'ночью +' + dataFile[i].temperature.night + '°';
            cloudList[i].innerHTML = dataFile[i].cloudiness + ',';

            if (dataFile[i].rain === true) {
                newImg.setAttribute("src", "images/Rain2.png");
                imageList[i].appendChild(newImg);
                rainList[i].innerHTML = 'дождь'
            } else if (dataFile[i].cloudiness === 'облачно') {
                newImg.setAttribute("src", "images/Cloud2.png");
                imageList[i].appendChild(newImg);
                rainList[i].innerHTML = 'без осадков'
            } else {
                newImg.setAttribute("src", "images/Sun2.png");
                imageList[i].appendChild(newImg);
                rainList[i].innerHTML = 'без осадков'
            }
        }
    };
    itemFiller();
    // dayList.innerHTML = formatter.format(date);

}) ();