const _bot = require("../ROOT/BOT")
const root = require("../ROOT/ROOT")

var Modes = {
    lessonsMode: false,
    homeworkMode: false
}

var keys = [
    ["Домашние задания", "Расписание", "Преподаватели"],
    ["Профиль", "...", "Обратная связь"],
    ["..."]
]

function mainMenuActivity(text, ChatId, msg){
    if (msg.from.id == root.__ROOT_ID__){
        keys[2] = ["Админ-панель"]
    }
    if (text == "/menu"){
        _bot.bot.sendMessage(ChatId, 'Выбери раздел:', {
            reply_markup: {
                keyboard: keys
            }
        })
        return true
    }
    if (text == "Вернуться в меню"){
        Modes.lessonsMode = false;
        Modes.homeworkMode = false;
        _bot.bot.sendMessage(ChatId, 'Выбери раздел:', {
            reply_markup: {
                keyboard: keys
            }
        })
        return true
    }
    return false
}

module.exports = {mainMenuActivity, Modes}