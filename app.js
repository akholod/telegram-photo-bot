const TelegramBot = require('node-telegram-bot-api');
const createMessageHelper = require("./create_message_helper");
const unirest = require('unirest');
const token = '289118113:AAGZfNMD_ziSF5HRdhLK3DHBDoPbIsiSJ34';

const bot = new TelegramBot(token, {polling: true});


//message handler
bot.on('message', function (msg) {
    'use strict'
    console.log(msg);
    var chatId = msg.chat.id;
    
    try {
        if(msg.text ==='/start'){
            return bot.sendMessage(chatId, 'Привет, отправь мне фото человека, как файл или как фото в хоршем качестве');
        }
        
        // if message does not contain an image
        if(!msg.document  && !msg.photo) {
            return bot.sendMessage(chatId,'Это ты мне не фото отпрвил, отправь фото');
        }
    
        var fileId;
        if(msg.photo){
            fileId = msg.photo[0].file_id;
        } else {
            fileId = msg.document.file_id;
        }
    } catch(err) {
        console.log(err);
        bot.sendMessage(chatId, 'Не удалось обработать фото, попробуй другое');
    }
    
    //when we recieve foto, then get query to face detection api
    var fileObj = bot.getFileLink(fileId);
    fileObj.then((link) => {
      
        console.log('This is file link ' + link);
        bot.sendMessage(chatId,'Подожди, обрабатываю твою фотку ' + link);
        
        unirest.get("https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?attribute=glass%2Cpose%2Cgender%2Cage%2Crace%2Csmiling&url=" + link)
            .header("X-Mashape-Key", "ZiSvxlSC2LmshyfmX0kP29QLie0jp19p1qljsnurHNcHpSBLTF")
            .header("Accept", "application/json")
            .end(function (result) {
                try{
                    //no faces in photo
                    if(!result.body.face[0]) {
                        return bot.sendMessage(chatId,'У тебя нет лица на фото, или фото плохого качества. Попробуй отправить его мне как файл.');
                    }
                    
                    //if we recieve correct answer create meesage with data
                    var messages = createMessageHelper(result.body.face[0]);  
                    console.log(result.body.face[0]);
                    messages.forEach((item) => {
                    bot.sendMessage(chatId, item);
                })
                // face detect api error
                } catch (err) {
                    bot.sendMessage(chatId, 'Не удалось обработать фото, попробуй другое');
                    console.log(err);
                }
                
        });
    })
    
});

