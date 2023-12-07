const {error_messages, spec_symbols} = require("../BotConfig/config_messages")

const _bot = require("../ROOT/BOT")
const db_ = require("../ExternalCommands/DatabaseUtility")
const logg = require("../ExternalCommands/LogsUtility")
const homeW = require("../ExternalCommands/GetHomeworkUtility")

const menuActivity = require("../Activities/modeMainMenu")

const AHW = require("../ExternalCommands/HomeworkProcessing/AddHomeWork")
const EHW = require("../ExternalCommands/HomeworkProcessing/EditHomeWork")

var DataClass = {
    id_: '',
    task_: '',
    date_: '',
    subject_: '',

    setIdValue: function(n) {DataClass.id_ = n},
    setSubjectValue: function(n) {DataClass.subject_ = n},
    setTaskValue: function(n) {DataClass.task_ = n},
    setDateValue: function(n) {DataClass.date_ = n},
}

function HomeworkProccessing(text, ChatId){

    switch (text) {

        case ("🔎 Узнать ДЗ"):
            homeW.knowHomework(ChatId)
            break

        case ("✅ Добавить ДЗ"):

            _bot.BotMsg(ChatId, `${spec_symbols["SB_write"]} По какому предмету? (ответьте на это сообщение)`)
            break

        case ("🖋️ Редактировать ДЗ"):

            homeW.knowHomework(ChatId)
            _bot.BotMsg(ChatId, `${spec_symbols["SB_edit"]} Выбери ID нужной записи (ответьте на это сообщение)`)
            break

        case ("🗑 Удалить ДЗ"):

            homeW.knowHomework(ChatId)
            _bot.BotMsg(ChatId, `[🗑] Выбери ID нужной записи (ответьте на это сообщение)`)
            break
    }
}

function homeworkManageActivity(text, ChatId, msg){
    if (text == "Домашние задания"){
        _bot.bot.sendMessage(ChatId, 'Домашние задания - Выберите опцию:', {
            reply_markup: {
                keyboard: [
                    ["✅ Добавить ДЗ", "🔎 Узнать ДЗ"],
                    ["🖋️ Редактировать ДЗ", "🗑 Удалить ДЗ"],
                    ["Вернуться в меню"]
                ]
            }
        })
        menuActivity.Modes.homeworkMode = true;
    }

    HomeworkProccessing(text, ChatId, msg)
    if (msg.reply_to_message){
    
        // ADD
        if (AHW.AddHWProcessing(msg, ChatId)){
            return true
        }
        // ADD
        
        // EDIT
        if (EHW.EditHWProcessing(msg, ChatId)){
            return true
        }
        // EDIT

        // DELETE
        if (msg.reply_to_message.text === `[🗑] Выбери ID нужной записи (ответьте на это сообщение)`){

            id_ = Number(msg.text)
            if (id_){
                
                db_.DbDeleteData('homework', id_)

                logg.logger(msg, 'Удалил задание')

                _bot.BotMsg(ChatId, `[${spec_symbols["SB_success"]}] Пользователь <u>${msg.from.first_name}</u> успешно удалил задание`)
                return true
            }
            else {
                _bot.BotMsg(ChatId, error_messages["ERROR_NotANumber"])
            }
        }
        // DELETE
    }
    return false;
}

module.exports = {homeworkManageActivity, DataClass}