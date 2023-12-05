const root = require("../ROOT/ROOT")
const TelegramApi = require("node-telegram-bot-api");

const bot = new TelegramApi(root.__TOKEN__, {polling: true});

// Short Bot send-message func
function BotMsg(id, txt, parse_m="html"){
    return bot.sendMessage(id, txt, {parse_mode: parse_m,
    reply_markup:{
        remove_keyboard: true
    }});
}

function createPoll(id, quest, options_array, anonim=false){
    bot.sendPoll(id, quest, options_array, {is_anonymous: anonim})
}

module.exports = {BotMsg, bot, createPoll}