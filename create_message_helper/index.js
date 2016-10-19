
function createResultMessege (obj) {
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
    
    resMessages.push(`Ваш возраст скорее всего ${age  + ageEnding(age)}`);
    resMessages.push(`Ваш пол ${getGender(gender)} на ${genderConfidence}`);
    
    
    return resMessages;
}

function getGender(gender) {
    if(gender === 'Female') {
        return 'женщинский';
    }
    return 'мужской';
}

function ageEnding(age) {
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