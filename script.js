const dataFile =     [{"date":1564344000000,"temperature":{"night":5,"day":26},"cloudiness":"ясно","snow":false,"rain":true},{"date":1564430400000,"temperature":{"night":0,"day":16},"cloudiness":"облачно","snow":false,"rain":false},{"date":1564516800000,"temperature":{"night":6,"day":20},"cloudiness":"ясно","snow":false,"rain":false},{"date":1564603200000,"temperature":{"night":10,"day":28},"cloudiness":"облачно","snow":false,"rain":true},{"date":1564689600000,"temperature":{"night":2,"day":16},"cloudiness":"ясно","snow":false,"rain":false},{"date":1564776000000,"temperature":{"night":9,"day":24},"cloudiness":"облачно","snow":false,"rain":false},{"date":1564862400000,"temperature":{"night":9,"day":27},"cloudiness":"ясно","snow":false,"rain":false},{"date":1564948800000,"temperature":{"night":6,"day":16},"cloudiness":"облачно","snow":false,"rain":false},{"date":1565035200000,"temperature":{"night":9,"day":23},"cloudiness":"облачно","snow":false,"rain":true},{"date":1565121600000,"temperature":{"night":6,"day":28},"cloudiness":"ясно","snow":false,"rain":true}];



(() => {

    const container = document.querySelector('.slider__container');
    const buttonRight = document.querySelector('.slider__control_right');
    const buttonLeft = document.querySelector('.slider__control_left');
    const headerDate = document.querySelector('.location');
    buttonLeft.disabled = true;
    buttonLeft.style.display = 'none';
    const dateFormatter = new Intl.DateTimeFormat('ru', {month: "long", day: "numeric"});
    const dayFormatter = new Intl.DateTimeFormat('ru', {weekday: "long"});

    const getStartOfDay = (date) => {
        const currentDay = new Date(date);
        currentDay.setHours(0,0,0,0);
        return currentDay;
    };

    const getToday = () => {
        const today = new Date();
        today.setHours(0,0,0,0);
        return today;
    };

    const isToday = (date) => {
        const today = getToday();
        const currentDay = getStartOfDay(date);
        return currentDay.getTime() === today.getTime();
    };

    const isTodayAndLater = (date) => {
        const today = getToday();
        const currentDay = getStartOfDay(date);
        return currentDay.getTime() >= today.getTime();
    };

    const daysFilter = ((dailyInfo) => isTodayAndLater(dailyInfo.date));

    const filteredDays = dataFile.filter(daysFilter);

    const headerFiller = () => {
        headerDate.innerHTML = 'Самара, ' + dateFormatter.format(filteredDays[0].date) + ', ' + dayFormatter.format(filteredDays[0].date);
    };

    const createWeekday = (date) => {
        const newDay = document.createElement('div');
        newDay.setAttribute("class", "item__weekday");
        newDay.innerHTML = isToday(date) ? 'сегодня' : dayFormatter.format(date); // TODO: Дата пересоздаётся при каждой проверке
        return newDay;
    };
    // TODO: сделать в одну строчку
    const createDay = (date) => {
        const newDate = document.createElement('div');
        newDate.setAttribute("class", "item__day");
        newDate.innerHTML = dateFormatter.format(date);
        return newDate;
    };


    const createImg = (rain, snow, cloudiness) => {
        const newImg = document.createElement('img'); // TODO: сделать одинарные кавычки (везде)
        let imgSrc = "images/Sun2.png";
        let imgAlt = 'без осадков, солнечно';
        if (snow && rain) {
            imgSrc = 'images/Snow1.png';
            imgAlt = 'снег с дождём'
        }else if (rain) {
            imgSrc = 'images/Rain2.png';
            imgAlt = 'дождь';
        } else if (snow) {
            imgSrc = 'images/Snow1.png';
            imgAlt = 'снег';
        } else if (cloudiness === 'облачно') {
            imgSrc = 'images/Cloud2.png';
            imgAlt = 'без осадков, облачно';
        }
        newImg.setAttribute("src", imgSrc);
        newImg.setAttribute("alt", imgAlt);
        return newImg;
    };

    const createTemp = (temp, isDay) => {
        const newTemp = document.createElement('div');
        const className = isDay ? "item__temp-day" : "item__temp-night";
        newTemp.setAttribute("class", className);
        newTemp.innerHTML = `${isDay ? 'днём' : 'ночью'} ${temp < 0 ? '-' : '+' }${temp}°`;
        return newTemp;
    };

    const createCloud = (cloudiness) => {
        const newCloud = document.createElement('div');
        newCloud.setAttribute('class', 'item__cloud');
        newCloud.innerHTML = `${cloudiness},`;
        return newCloud;
    };

    const createPrecip = (snow, rain) => {
        const newPrecip = document.createElement('div');
        newPrecip.setAttribute('class', 'item__precip');
        let precip = 'без осадков';
        if (snow && rain) {
            precip = 'снег с дождём';
        } else if (snow) {
            precip = 'снег';
        } else if (rain) {
            precip = 'дождь';
        }
        newPrecip.innerHTML = precip;
        return newPrecip;
    };

    const createSlide = ({date, rain, snow, cloudiness, temperature}) => {
        const slide = document.createElement("div");
        slide.setAttribute('class', 'slider__item');
        const weekday = createWeekday(date);
        slide.appendChild(weekday);
        const day = createDay(date);
        slide.appendChild(day);
        const img = createImg(rain, snow, cloudiness);
        slide.appendChild(img);
        const dayTemp = createTemp(temperature.day, true);
        slide.appendChild(dayTemp);
        const nightTemp = createTemp(temperature.night, false);
        slide.appendChild(nightTemp);
        const cloud = createCloud(cloudiness);
        slide.appendChild(cloud);
        const precip = createPrecip(snow,rain);
        slide.appendChild(precip);
        return slide;
    };

    const initialCount = filteredDays.length > 5 ? 5 : filteredDays.length;

    const filler = () => {
        for (i =0; i < initialCount; i++) {
            const slide = createSlide(filteredDays[i]);
            container.appendChild(slide);
        }
    };

    const sliderItemWidth = 256;
    let position = 0;
    const minPos = 0;
    const maxPos = filteredDays.length-4;

    container.style.width = (sliderItemWidth*filteredDays.length) + 'px';

    const sliderRight = () => {
        position++;
        container.style.transform = `translateX(${position*(-sliderItemWidth)}px)`;
    };

    const sliderLeft = () => {
        position--;
        container.style.transform = `translateX(${position*(-sliderItemWidth)}px)`;
    };

    const addSlide = (index) => {
        const slide = createSlide(filteredDays[index]);
        container.appendChild(slide);
    };

    const handleRightButtonClick = () => {
        sliderRight();
        if (position > minPos) {
            buttonLeft.disabled = false;
            buttonLeft.style.display = 'block';
        }
        if (position >= maxPos) {
            buttonRight.disabled = true;
            buttonRight.style.display = 'none';
        }
        if (position < maxPos) {
            addSlide(position + 4);
        }

    };
    const handleLeftButtonClick = () => {
        sliderLeft();
        if (position <= minPos) {
            buttonLeft.disabled = true;
            buttonLeft.style.display = 'none';
        }
        if (position < maxPos) {
            buttonRight.disabled = false;
            buttonRight.style.display = 'block';
        }
    };

    buttonRight.addEventListener('click', handleRightButtonClick);
    buttonLeft.addEventListener('click', handleLeftButtonClick);

    headerFiller();
    filler();

}) ();