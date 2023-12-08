const _bot = require("../ROOT/BOT")
const root = require("../ROOT/ROOT");

const {info_messages, spec_symbols, error_messages} = require("../BotConfig/config_messages")
const gt = require("../ExternalCommands/GetTeachersUtility")

function getTeachersActivity(text, ChatId, msg){
    if (text == "Преподаватели"){
        _bot.bot.sendMessage(ChatId, "Преподаватели - выберите опцию:", {
            reply_markup: {
                keyboard: [
                    ["Полный список", "Поиск"],
                    ["Вернуться в меню"]
                ]
            }
        })
        return true
    }
    if (text == "Полный список"){
        _bot.BotMsg(ChatId, "| Педсостав |\n" + gt.getTeachers(text))
        return true
    }
    if (text == "Поиск"){
        _bot.BotMsg(ChatId, "Введите фамилию или предмет (воспользуйтесь опцией 'ответить' на это сообщение)")
        return true
    }
    if (msg.reply_to_message){
        if (msg.reply_to_message.text == "Введите фамилию или предмет (воспользуйтесь опцией 'ответить' на это сообщение)"){
            _bot.BotMsg(ChatId, "| Педсостав |\n" + gt.getTeacherBySurname(text))
            
        }
    }
    return false
}

module.exports = {getTeachersActivity}