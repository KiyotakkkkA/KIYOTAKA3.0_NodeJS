const _bot = require("../ROOT/BOT")

var Modes = {
    lessonsMode: false,
    homeworkMode: false
}

var keys = [
    ["Домашние задания", "Расписание", "Преподаватели"],
    ["Профиль", "Топики [WIP]", "Обратная связь [WIP]"],
    ["..."]
]

function mainMenuActivity(text, ChatId){
    if (text == "/menu"){
        _bot.bot.sendMessage(ChatId, 'Выбери раздел:', {
            reply_markup: {
                keyboard: keys
            }
        })
    }
    if (text == "Вернуться в меню"){
        Modes.lessonsMode = false;
        Modes.homeworkMode = false;
        _bot.bot.sendMessage(ChatId, 'Выбери раздел:', {
            reply_markup: {
                keyboard: keys
            }
        })
    }
    return true;
}

module.exports = {mainMenuActivity, Modes}