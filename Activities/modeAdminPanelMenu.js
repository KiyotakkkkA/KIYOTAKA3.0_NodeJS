const _bot = require("../ROOT/BOT")
const root = require("../ROOT/ROOT")

const {error_messages, spec_symbols} = require("../BotConfig/config_messages")

var Settings = {
    __BLOCKED__: false
}

var keysModel = {
    changeMode: "Отключить бота",
    ban: "Заблокировать пользователя",
    broadcast: "Сделать объявление"
}

var admin_buttons = [
    [keysModel.changeMode, "Заблокировать пользователя"],
    ["Сделать объявление", "..."]
]

function checkPermission(msg, command){
    if (msg.from.id != root.__ROOT_ID__){
        _bot.BotMsg(ChatId, error_messages['ERROR_NoPerm'])
        return false
    }
    if (msg.text != command){
        return false
    }
    return true
}

function enableBot(text, ChatId, msg){

    if (text == "Включить бота" && msg.from.id == root.__ROOT_ID__){
        Settings.__BLOCKED__ = false
        _bot.BotMsg(ChatId, "[" + spec_symbols['SB_success'] + "] Статус блокировки изменён на: " + Settings.__BLOCKED__)
        return true
    }

    if (msg.from.id == root.__ROOT_ID__){
        _bot.bot.sendMessage(ChatId, "Бот неактивен", {
            reply_markup: {
            keyboard: [
                ["Включить бота"]
            ]
        }
        })

        return true
    }
    return false
}

function AdminPanelActivity(text, ChatId, msg){
    if (text == "Админ-панель"){
        if (msg.from.id != root.__ROOT_ID__){
            _bot.BotMsg(ChatId, error_messages['ERROR_NoPerm'])
            return true
        }
        _bot.bot.sendMessage(ChatId, "Админ-панель - выберите опцию", {
            reply_markup: {
            keyboard: admin_buttons
        }
        })
    }
    if (checkPermission(msg, keysModel.changeMode)){
        Settings.__BLOCKED__ = !Settings.__BLOCKED__
        _bot.BotMsg(ChatId, "[" + spec_symbols['SB_success'] + "] Статус блокировки изменён на: " + Settings.__BLOCKED__)
        return true
    }
}

module.exports = {AdminPanelActivity, Settings, enableBot}