const _bot = require("../../ROOT/BOT")
const logg = require("../LogsUtility")
const db_ = require("../DatabaseUtility")

const {error_messages, spec_symbols} = require("../../BotConfig/config_messages")
const {day_modify} = require("../../BotConfig/config_general")

function EditHWProcessing(msg, ChatId){
    var dc = require("../../Activities/modeHomeworkMenu")
    db_.DataBases.changeDB(db_.DataBases.current_db, db_.DataBases.db)
    
    if (msg.reply_to_message.text === `${spec_symbols["SB_edit"]} Выбери ID нужной записи (ответьте на это сообщение)`)
    {
        dc.DataClass.setIdValue(Number(msg.text))
        if (dc.DataClass.id_){
            _bot.BotMsg(ChatId, `${spec_symbols["SB_edit"]} Редактирование предмета (ответьте на это сообщение)`)
        }
        else {
            _bot.BotMsg(ChatId, error_messages["ERROR_NotANumber"])
            return 0
        }

    }
    if (msg.reply_to_message.text === `${spec_symbols["SB_edit"]} Редактирование предмета (ответьте на это сообщение)`)
    {
        if (typeof msg.text === "string"){
            dc.DataClass.setSubjectValue(msg.text)
            _bot.BotMsg(ChatId, `${spec_symbols["SB_edit"]} Редактирование задания (ответьте на это сообщение)`)
        }
        else {
            _bot.BotMsg(ChatId, error_messages['ERROR_NotAString'])
            return 0
        }
    }
    if (msg.reply_to_message.text === `${spec_symbols["SB_edit"]} Редактирование задания (ответьте на это сообщение)`)
    {
        if (typeof msg.text === "string"){
            dc.DataClass.setTaskValue(msg.text)
            _bot.BotMsg(ChatId, `|${spec_symbols["SB_edit"]} Редактирование даты (ответьте на это сообщение)`)
            _bot.BotMsg(ChatId, `|${spec_symbols["SB_edit"]} Формат - день недели словом\n|${spec_symbols["SB_edit"]} [Например: пятница]\n\n|${spec_symbols["SB_edit"]} Стандартный срок - 1 неделя\n|${spec_symbols["SB_edit"]} Для изменения воспользуйтесь\n|${spec_symbols["SB_edit"]} суффиксом +[N]нед, где N - число недель\n|${spec_symbols["SB_edit"]} [Например: среда +2нед]`)   
        }
        else {
            _bot.BotMsg(ChatId, error_messages['ERROR_NotAString'])
            return 0
        }
    }
    if (msg.reply_to_message.text === `|${spec_symbols["SB_edit"]} Редактирование даты (ответьте на это сообщение)`)
    {
        if (typeof msg.text === "string"){

            if (msg.text.includes("+")){
                var data_arr = msg.text.split("+")
                var format_day = String(data_arr[0]).replace(' ', '').toLowerCase()
                var format_offset = Number(String(data_arr[1]).replace('нед', '')) * 7

            }
            else {
                var format_day = msg.text
                var format_offset = 7
            }

            if (format_day in day_modify){
                const today_ = new Date();

                let day_id = day_modify[format_day]
                let total_day_offset = day_id - (today_.getDay() - 1)

                today_.setDate(today_.getDate() + format_offset + total_day_offset)

                dc.DataClass.setDateValue(`${format_day} ${today_.toLocaleDateString()}`)

                db_.DbEditData('homework', dc.DataClass.subject_.toLowerCase(), 'subj', dc.DataClass.id_)
                db_.DbEditData('homework', dc.DataClass.task_.toLowerCase(), 'text', dc.DataClass.id_)
                db_.DbEditData('homework', dc.DataClass.date_, 'date', dc.DataClass.id_)

                logg.logger(msg, 'Изменил задание')

                _bot.BotMsg(ChatId, `[${spec_symbols["SB_success"]}] Пользователь <u>${msg.from.first_name}</u> успешно изменил задание`)
                return 1
            }
            else{
                _bot.BotMsg(ChatId, error_messages['ERROR_WrongForm'])
            }

        }
        else {
            _bot.BotMsg(ChatId, error_messages['ERROR_NotAString'])
            return 0
            
        }
    }
}
module.exports = {EditHWProcessing}