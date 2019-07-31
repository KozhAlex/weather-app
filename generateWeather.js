function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const cloudinessCases = ["ясно", "облачно"];

const daysArray = [];
const daysCount = 20;
const yesterday = new Date();
yesterday.setHours(0, 0, 0, 0);
yesterday.setDate(yesterday.getDate() - 1);
let curentDate = yesterday.getTime();

for (let i = 0; i < daysCount; i++) {
    const day = {
        date: curentDate,
        temperature: {
            night: getRandomInt(0, 15),
            day: getRandomInt(15, 30)
        },
        cloudiness:
            cloudinessCases[Math.floor(Math.random() * cloudinessCases.length)],
        snow: Math.random() >= 0.75,
        rain: Math.random() >= 0.75
    };
    daysArray.push(day);
    curentDate = curentDate + 24 * 60 * 60 * 1000;
}

console.log(JSON.stringify(daysArray));