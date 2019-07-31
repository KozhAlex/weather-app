const dataFile = [{"date":1564516800000,"temperature":{"night":14,"day":28},"cloudiness":"ясно","snow":true,"rain":false},{"date":1564603200000,"temperature":{"night":0,"day":25},"cloudiness":"облачно","snow":false,"rain":false},{"date":1564689600000,"temperature":{"night":13,"day":19},"cloudiness":"ясно","snow":false,"rain":false},{"date":1564776000000,"temperature":{"night":6,"day":28},"cloudiness":"ясно","snow":true,"rain":false},{"date":1564862400000,"temperature":{"night":10,"day":21},"cloudiness":"ясно","snow":true,"rain":true},{"date":1564948800000,"temperature":{"night":13,"day":24},"cloudiness":"ясно","snow":false,"rain":false},{"date":1565035200000,"temperature":{"night":13,"day":29},"cloudiness":"ясно","snow":false,"rain":false},{"date":1565121600000,"temperature":{"night":1,"day":27},"cloudiness":"облачно","snow":false,"rain":true},{"date":1565208000000,"temperature":{"night":10,"day":16},"cloudiness":"облачно","snow":false,"rain":false},{"date":1565294400000,"temperature":{"night":3,"day":17},"cloudiness":"ясно","snow":false,"rain":false},{"date":1565380800000,"temperature":{"night":8,"day":18},"cloudiness":"ясно","snow":false,"rain":false},{"date":1565467200000,"temperature":{"night":11,"day":15},"cloudiness":"ясно","snow":false,"rain":false},{"date":1565553600000,"temperature":{"night":6,"day":15},"cloudiness":"ясно","snow":false,"rain":false},{"date":1565640000000,"temperature":{"night":3,"day":17},"cloudiness":"ясно","snow":false,"rain":false},{"date":1565726400000,"temperature":{"night":10,"day":19},"cloudiness":"облачно","snow":true,"rain":false},{"date":1565812800000,"temperature":{"night":1,"day":26},"cloudiness":"ясно","snow":false,"rain":false},{"date":1565899200000,"temperature":{"night":1,"day":20},"cloudiness":"ясно","snow":false,"rain":false},{"date":1565985600000,"temperature":{"night":0,"day":19},"cloudiness":"ясно","snow":false,"rain":false},{"date":1566072000000,"temperature":{"night":3,"day":27},"cloudiness":"облачно","snow":false,"rain":false},{"date":1566158400000,"temperature":{"night":1,"day":27},"cloudiness":"ясно","snow":false,"rain":false}];



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

    container.style.width = (sliderItemWidth*initialCount) + 'px';

    const sliderRight = (pos) => {
        container.style.transform = `translateX(${pos*(-sliderItemWidth)}px)`;
        const slidesCount = initialCount + pos;
        container.style.width = (sliderItemWidth*slidesCount) + 'px';
    };

    const sliderLeft = (pos) => {
        container.style.transform = `translateX(${pos*(-sliderItemWidth)}px)`;
        const slidesCount = initialCount + pos;
        container.style.width = (sliderItemWidth*slidesCount) + 'px';
    };

    const addLastSlide = (index) => {
        const slide = createSlide(filteredDays[index]);
        container.appendChild(slide);
    };

    const handleRightButtonClick = () => {
        position++;
        sliderRight(position);
        if (position > minPos) {
            buttonLeft.disabled = false;
            buttonLeft.style.display = 'block';
        }
        if (position >= maxPos) {
            buttonRight.disabled = true;
            buttonRight.style.display = 'none';
        }
        if (position < maxPos) {
            addLastSlide(position + 4);
        }
    };
    const handleLeftButtonClick = () => {
        position--;
        sliderLeft(position);
        if (position <= minPos) {
            buttonLeft.disabled = true;
            buttonLeft.style.display = 'none';
        }
        if (position < maxPos) {
            buttonRight.disabled = false;
            buttonRight.style.display = 'block';
        }
        if (position < maxPos - 1) {
            container.removeChild(container.lastChild);
        }
    };

    buttonRight.addEventListener('click', handleRightButtonClick);
    buttonLeft.addEventListener('click', handleLeftButtonClick);


    headerFiller();
    filler();

}) ();