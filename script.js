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
    const maxPos = -512;
    const minPos = 0;
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

    const itemCreator = function() {

    };

    const itemFiller = function() {
        let dayList = document.querySelectorAll('.item__day');
        let dateList = document.querySelectorAll('.item__date');
        let imageList = document.querySelectorAll('.item__image');
        let tDayList = document.querySelectorAll('.item__tempDay');
        let tNightList = document.querySelectorAll('.item__tempNight');
        let cloudList = document.querySelectorAll('.item__cloud');
        let rainList = document.querySelectorAll('.item__rain');
        for (let i = 0; i< dayList.length; i++) {
            let newImg = document.createElement('img');
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
    headerFiller();
    itemFiller();
    // dayList.innerHTML = formatter.format(date);

}) ();