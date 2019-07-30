const dataFile =     [{"date":1564344000000,"temperature":{"night":5,"day":26},"cloudiness":"ясно","snow":true,"rain":true},{"date":1564430400000,"temperature":{"night":0,"day":16},"cloudiness":"облачно","snow":false,"rain":true},{"date":1564516800000,"temperature":{"night":6,"day":20},"cloudiness":"ясно","snow":true,"rain":false},{"date":1564603200000,"temperature":{"night":10,"day":28},"cloudiness":"облачно","snow":true,"rain":true},{"date":1564689600000,"temperature":{"night":2,"day":16},"cloudiness":"ясно","snow":true,"rain":false},{"date":1564776000000,"temperature":{"night":9,"day":24},"cloudiness":"облачно","snow":true,"rain":false},{"date":1564862400000,"temperature":{"night":9,"day":27},"cloudiness":"облачно","snow":true,"rain":false},{"date":1564948800000,"temperature":{"night":6,"day":16},"cloudiness":"облачно","snow":true,"rain":false},{"date":1565035200000,"temperature":{"night":9,"day":23},"cloudiness":"облачно","snow":false,"rain":true},{"date":1565121600000,"temperature":{"night":6,"day":28},"cloudiness":"облачно","snow":false,"rain":true}];



(function () {
    let position = 0;
    let minPos = 0;
    let container = document.querySelector('.slider__container');
    let buttonRight = document.querySelector('.slider__control_right');
    let buttonLeft = document.querySelector('.slider__control_left');
    let headerDate = document.querySelector('.location');
    let date = (Date.now()-(24*60*60*1000));
    buttonLeft.disabled = true;
    let dateFormatter = new Intl.DateTimeFormat('ru', {month: "long", day: "numeric"});
    let dayFormatter = new Intl.DateTimeFormat('ru', {weekday: "long"});
    let dayStart = new Date();
    dayStart.setHours(0,0,0,0);


    const daysFilter = function(dailyInfo) {
        return dailyInfo.date >= dayStart.getTime();
    };

    const filteredDays = dataFile.filter(daysFilter);

    const sliderItemWidth = 256;

    let maxPos = -sliderItemWidth*(filteredDays.length-4);


    const sliderRight = function() {
        position = position - sliderItemWidth;
        container.style.transform = 'translateX(' + position + 'px)';
    };

    const sliderLeft = function() {
        position = position + sliderItemWidth;
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
        headerDate.innerHTML = 'Самара, ' + dateFormatter.format(filteredDays[0].date) + ', ' + dayFormatter.format(filteredDays[0].date);
    };

    const slideCreator = function() {
        for (let i = 0; i < filteredDays.length; i++) {
            newSlide = document.createElement("div");
            newSlide.setAttribute('class', 'slider__item');
            container.appendChild(newSlide);
        }
    };
    slideCreator();

    container.style.width = (256*filteredDays.length) + 'px';

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
                dayList[i].innerHTML = dayFormatter.format(filteredDays[i].date);
            } else {
                dayList[i].innerHTML = 'сегодня';
            }
            dateList[i].innerHTML = dateFormatter.format(filteredDays[i].date);
            tDayList[i].innerHTML = 'днём +' + filteredDays[i].temperature.day + '°';
            tNightList[i].innerHTML = 'ночью +' + filteredDays[i].temperature.night + '°';
            cloudList[i].innerHTML = filteredDays[i].cloudiness + ',';

            if (filteredDays[i].rain === true) {
                newImg.setAttribute("src", "images/Rain2.png");
                sliderItem[i].insertBefore(newImg, tDayList[i]);
                rainList[i].innerHTML = 'дождь'
            } else if (filteredDays[i].cloudiness === 'облачно') {
                newImg.setAttribute("src", "images/Cloud2.png");
                sliderItem[i].insertBefore(newImg, tDayList[i]);
                rainList[i].innerHTML = 'без осадков'
            } else {
                newImg.setAttribute("src", "images/Sun2.png");
                sliderItem[i].insertBefore(newImg, tDayList[i]);
                rainList[i].innerHTML = 'без осадков'
            }

        }
    };
    headerFiller();
    itemFiller();
    // dayList.innerHTML = formatter.format(date);

}) ();