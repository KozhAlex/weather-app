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
    let n = 8;
    let maxPos = (-256*(n-4));
    let minPos = 0;
    let container = document.querySelector('.slider__container');
    let buttonRight = document.querySelector('.slider__control_right');
    let buttonLeft = document.querySelector('.slider__control_left');
    let headerDate = document.querySelector('.location');
    let date = Date.now();
    buttonLeft.disabled = true;
    let dateFormatter = new Intl.DateTimeFormat('ru', {month: "long", day: "numeric"});
    let dayFormatter = new Intl.DateTimeFormat('ru', {weekday: "long"});


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

    const headerFiller = function() {
        headerDate.innerHTML = 'Самара, ' + dateFormatter.format(date) + ', ' + dayFormatter.format(date);
    };

    const incrementDate = function() {
        date = date+(24*60*60*1000);
        return date;
    };



    const slideCreator = function() {
        for (let i = 0; i < n; i++) {
            newSlide = document.createElement("div");
            newSlide.setAttribute('class', 'slider__item');
            container.appendChild(newSlide);
        }
    };
    slideCreator();

    container.style.width = (256*n) + 'px';

    const itemCreator = function() {
        sliderItem = document.querySelectorAll('.slider__item');
        for (let i = 0; i < sliderItem.length; i++) {
            newDay = document.createElement('div');
            newDay.setAttribute("class", "item__day");
            newDate = document.createElement('div');
            newDate.setAttribute("class", "item__date");
            newTDay = document.createElement('div');
            newTDay.setAttribute("class", "item__temp-day");
            newTNight = document.createElement('div');
            newTNight.setAttribute("class", "item__temp-night");
            newCloud = document.createElement('div');
            newCloud.setAttribute("class", "item__cloud");
            newRain = document.createElement('div');
            newRain.setAttribute("class", "item__rain");
            newSnow = document.createElement('div');
            newSnow.setAttribute("class", "item__snow");

            sliderItem[i].appendChild(newDay);
            sliderItem[i].appendChild(newDate);
            sliderItem[i].appendChild(newTDay);
            sliderItem[i].appendChild(newTNight);
            sliderItem[i].appendChild(newCloud);
            sliderItem[i].appendChild(newRain);
            sliderItem[i].appendChild(newSnow);
        }
    };
    itemCreator();

    const itemFiller = function() {
        dayList = document.querySelectorAll('.item__day');
        dateList = document.querySelectorAll('.item__date');
        tDayList = document.querySelectorAll('.item__temp-day');
        tNightList = document.querySelectorAll('.item__temp-night');
        cloudList = document.querySelectorAll('.item__cloud');
        rainList = document.querySelectorAll('.item__rain');
        for (let i = 0; i < sliderItem.length; i++) {
            newImg = document.createElement('img');
            if (i !== 0) {
                dayList[i].innerHTML = dayFormatter.format(date);
            } else {
                dayList[i].innerHTML = 'сегодня';
            }
            dateList[i].innerHTML = dateFormatter.format(date);
            tDayList[i].innerHTML = 'днём +' + dataFile[i].temperature.day + '°';
            tNightList[i].innerHTML = 'ночью +' + dataFile[i].temperature.night + '°';
            cloudList[i].innerHTML = dataFile[i].cloudiness + ',';

            if (dataFile[i].rain === true) {
                newImg.setAttribute("src", "images/Rain2.png");
                sliderItem[i].insertBefore(newImg, tDayList[i]);
                rainList[i].innerHTML = 'дождь'
            } else if (dataFile[i].cloudiness === 'облачно') {
                newImg.setAttribute("src", "images/Cloud2.png");
                sliderItem[i].insertBefore(newImg, tDayList[i]);
                rainList[i].innerHTML = 'без осадков'
            } else {
                newImg.setAttribute("src", "images/Sun2.png");
                sliderItem[i].insertBefore(newImg, tDayList[i]);
                rainList[i].innerHTML = 'без осадков'
            }

            incrementDate();
        }
    };
    headerFiller();
    itemFiller();
    // dayList.innerHTML = formatter.format(date);

}) ();