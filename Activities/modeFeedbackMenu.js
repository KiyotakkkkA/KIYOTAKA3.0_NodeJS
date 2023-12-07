const _bot = require("../ROOT/BOT")
const root = require("../ROOT/ROOT");

const {info_messages, spec_symbols} = require("../BotConfig/config_messages")

function feedbackActivity(text, ChatId, msg) {
    if (text == "Обратная связь"){
        _bot.BotMsg(ChatId, spec_symbols['SB_write'] + " Оставьте вашу жалобу/предложение (ответьте на это сообщение)")
        return true
    }
    if (msg.reply_to_message){
        if (msg.reply_to_message.text == spec_symbols['SB_write'] + " Оставьте вашу жалобу/предложение (ответьте на это сообщение)"){
            _bot.BotMsg(root.__ROOT_ID__, "Сообщение от: <b><u>" + msg.chat.first_name + " " + msg.chat.last_name + "</u></b> - @" + msg.chat.username)
            _bot.bot.forwardMessage(root.__ROOT_ID__, ChatId, msg.message_id)
            _bot.BotMsg(ChatId, info_messages['INFO_SendSuccess'])
            return true
        }
    }
    return false
}

module.exports = {feedbackActivity}