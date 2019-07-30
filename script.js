const dataFile =     [{"date":1564344000000,"temperature":{"night":5,"day":26},"cloudiness":"ясно","snow":false,"rain":true},{"date":1564430400000,"temperature":{"night":0,"day":16},"cloudiness":"облачно","snow":false,"rain":false},{"date":1564516800000,"temperature":{"night":6,"day":20},"cloudiness":"ясно","snow":false,"rain":false},{"date":1564603200000,"temperature":{"night":10,"day":28},"cloudiness":"облачно","snow":false,"rain":true},{"date":1564689600000,"temperature":{"night":2,"day":16},"cloudiness":"ясно","snow":false,"rain":false},{"date":1564776000000,"temperature":{"night":9,"day":24},"cloudiness":"облачно","snow":false,"rain":false},{"date":1564862400000,"temperature":{"night":9,"day":27},"cloudiness":"облачно","snow":false,"rain":false},{"date":1564948800000,"temperature":{"night":6,"day":16},"cloudiness":"облачно","snow":false,"rain":false},{"date":1565035200000,"temperature":{"night":9,"day":23},"cloudiness":"облачно","snow":false,"rain":true},{"date":1565121600000,"temperature":{"night":6,"day":28},"cloudiness":"облачно","snow":false,"rain":true}];



(() => {
    let position = 0;
    const minPos = 0;
    const container = document.querySelector('.slider__container');
    const buttonRight = document.querySelector('.slider__control_right');
    const buttonLeft = document.querySelector('.slider__control_left');
    const headerDate = document.querySelector('.location');
    buttonLeft.disabled = true;
    buttonLeft.style.display = 'none';
    const dateFormatter = new Intl.DateTimeFormat('ru', {month: "long", day: "numeric"});
    const dayFormatter = new Intl.DateTimeFormat('ru', {weekday: "long"});

    let dayStart = new Date();
    dayStart.setHours(0,0,0,0);

    const daysFilter = ((dailyInfo) => dailyInfo.date >= dayStart.getTime());

    const filteredDays = dataFile.filter(daysFilter);

    const sliderItemWidth = 256;

    let maxPos = -sliderItemWidth*(filteredDays.length-4);

    const sliderRight = () => {
        position = position - sliderItemWidth;
        container.style.transform = 'translateX(' + position + 'px)';
    };

    const sliderLeft = () => {
        position = position + sliderItemWidth;
        container.style.transform = 'translateX(' + position + 'px)';
    };

    buttonRight.addEventListener('click', () => {
        sliderRight();
        if (position < minPos) {
            buttonLeft.disabled = false;
            buttonLeft.style.display = 'block';
        }
        if (position <= maxPos) {
            buttonRight.disabled = true;
            buttonRight.style.display = 'none';
        }
    });
    buttonLeft.addEventListener('click', () => {
        sliderLeft();
        if (position >= minPos) {
            buttonLeft.disabled = true;
            buttonLeft.style.display = 'none';
        }
        if (position > maxPos) {
            buttonRight.disabled = false;
            buttonRight.style.display = 'block';
        }
    });

    const headerFiller = () => {
        headerDate.innerHTML = 'Самара, ' + dateFormatter.format(filteredDays[0].date) + ', ' + dayFormatter.format(filteredDays[0].date);
    };

    const slideCreator = () => {
        for (let i = 0; i < filteredDays.length; i++) {
            const newSlide = document.createElement("div");
            newSlide.setAttribute('class', 'slider__item');
            container.appendChild(newSlide);
        }
    };
    slideCreator();

    container.style.width = (sliderItemWidth*filteredDays.length) + 'px';

    const itemCreator = () => {
        sliderItem = document.querySelectorAll('.slider__item');
        for (let i = 0; i < sliderItem.length; i++) {
            const newDay = document.createElement('div');
            newDay.setAttribute("class", "item__day");
            const newDate = document.createElement('div');
            newDate.setAttribute("class", "item__date");
            const newTDay = document.createElement('div');
            newTDay.setAttribute("class", "item__temp-day");
            const newTNight = document.createElement('div');
            newTNight.setAttribute("class", "item__temp-night");
            const newCloud = document.createElement('div');
            newCloud.setAttribute("class", "item__cloud");
            const newRain = document.createElement('div');
            newRain.setAttribute("class", "item__rain");

            sliderItem[i].appendChild(newDay);
            sliderItem[i].appendChild(newDate);
            sliderItem[i].appendChild(newTDay);
            sliderItem[i].appendChild(newTNight);
            sliderItem[i].appendChild(newCloud);
            sliderItem[i].appendChild(newRain);
        }
    };
    itemCreator();

    const itemFiller = () => {
        const dayList = document.querySelectorAll('.item__day');
        const dateList = document.querySelectorAll('.item__date');
        const tDayList = document.querySelectorAll('.item__temp-day');
        const tNightList = document.querySelectorAll('.item__temp-night');
        const cloudList = document.querySelectorAll('.item__cloud');
        const rainList = document.querySelectorAll('.item__rain');
        for (let i = 0; i < sliderItem.length; i++) {
            if (i !== 0) {
                dayList[i].innerHTML = dayFormatter.format(filteredDays[i].date);
            } else {
                dayList[i].innerHTML = 'сегодня';
            }
            dateList[i].innerHTML = dateFormatter.format(filteredDays[i].date);
            tDayList[i].innerHTML = 'днём +' + filteredDays[i].temperature.day + '°';
            tNightList[i].innerHTML = 'ночью +' + filteredDays[i].temperature.night + '°';
            cloudList[i].innerHTML = filteredDays[i].cloudiness + ',';

            let newImg = document.createElement('img');
            if (filteredDays[i].rain === true) {
                newImg.setAttribute("src", "images/Rain2.png");
                sliderItem[i].insertBefore(newImg, tDayList[i]);
                rainList[i].innerHTML = 'дождь'
            } else if (filteredDays[i].snow === true) {
                newImg.setAttribute("src", "images/Snow1.png");
                sliderItem[i].insertBefore(newImg, tDayList[i]);
                rainList[i].innerHTML = 'снег'
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

}) ();