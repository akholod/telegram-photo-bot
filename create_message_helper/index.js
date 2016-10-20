
module.exports = function createResultMessege (obj) {
    'use strict'
    let resMessages = [];
    let age,
        gender,
        genderConfidence,
        race,
        raceConfidence,
        smiling;
    age = obj.attribute.age.value;
    gender = obj.attribute.gender.value
    genderConfidence = obj.attribute.gender.confidence;
    raceConfidence = obj.attribute.race.confidence;
    smiling = obj.attribute.smiling.value;
    
    resMessages.push(`Вы улыбаетесь на ${smiling} %`);
    resMessages.push(`Ваш расса ${getRace(race)} на ${raceConfidence}`);
    resMessages.push(`Ваш пол ${getGender(gender)} на ${genderConfidence}`);
    resMessages.push(`Ваш возраст скорее всего ${age  + ageEnding(age)}`);
    return resMessages;
}

function getRace(race) {
    if(race == 'Asian') {
        return 'азиатская';
    }
    if(race == 'Black') {
        return 'черная';
    }
    return 'верная'
}

function getGender(gender) {
    if(gender === 'Female') {
        return 'женский';
    }
    return 'мужской';
}

function ageEnding(age) {
    'use strict'
    let wordAge;
    if (age > 19) {
        age = age % 10;
    }
    switch (age) {
        case 1:
            wordAge = 'год';
            break;
        case 2:
        case 3:
        case 4:
            wordAge = 'года';
            break;
        default:
            wordAge = 'лет';
    }
    return wordAge;
}