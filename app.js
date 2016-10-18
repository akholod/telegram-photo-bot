const TelegramBot = require('node-telegram-bot-api');
const unirest = require('unirest');
const path = require("path");
const token = '289118113:AAGZfNMD_ziSF5HRdhLK3DHBDoPbIsiSJ34';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
    'use strict'
    //console.log(msg);
    let chatId = msg.chat.id;
    if(!msg.document) {
        return bot.sendMessage(chatId,'This is no photo image');
    }
    if (msg.document.mime_type !== 'image/jpeg') {
       return bot.sendMessage(chatId,'This is no photo image, please send image .jpg');
    }

    
    let fileObj = bot.downloadFile(msg.document.file_id, path.join(__dirname, '/temp_photo'));
    fileObj.then((data) => {
        console.log('Succes file downloading to ' + data);
        bot.sendMessage(chatId,'Succes file downloading to ' + data);
    
    
        unirest.get("https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?" + data)
            .header("X-Mashape-Key", "ZiSvxlSC2LmshyfmX0kP29QLie0jp19p1qljsnurHNcHpSBLTF")
            .header("Accept", "application/json")
            .end(function (result) {
             console.log(result.status, result.headers, result.body);
        });
        
    })
    
    
    
});

