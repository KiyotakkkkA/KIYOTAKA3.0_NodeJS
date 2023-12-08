const _bot = require("../ROOT/BOT")

const db_ = require("../ExternalCommands/DatabaseUtility")
const {error_messages, spec_symbols} = require("../BotConfig/config_messages")

const homeW = require("../ExternalCommands/GetHomeworkUtility")

function checkAuth(x, msg, ChatId){
    if (!x){
        return false
    }
    for (let i = 0; i < x.length; i++){
        if (x[i].tg_id == msg.from.id){
            _bot.bot.sendMessage(ChatId, 'Профиль - Выбери раздел:', {
                reply_markup: {
                    keyboard: [
                        ["Таблица рейтинга", "Сообщить о выполнении ДЗ"],
                        ["Вернуться в меню"]
                    ]
                }
            })
            return true
        }
    }

    _bot.bot.sendMessage(ChatId, 'Профиль - Выбери опцию:', {
        reply_markup: {
            keyboard: [
                ["Зарегистрироваться"],
                ["Вернуться в меню"]
            ]
        }
    })
    return false
}

function showTable(x, ChatId){
    let ans = "| Таблица Рейтинга |\n\n"
    x.sort((a, b, c, d, e) => e)
    for (let i = 0; i < x.length; i++){
        ans += `<b>${x[i].id}</b>. <u>${x[i].name}</u> - [${x[i].score}]\n`
    }
    _bot.BotMsg(ChatId, ans)
    return
}

function completeHomework(x, id, name, ChatId, score, player_id){
    let compl;
    for (let i = 0; i < x.length; i++) {
        if (x[i].id == id){
            compl = x[i].complete
        }
    }
    updated = (compl + `<u>${name}</u>, `).replace("Никто", '')


    if (compl != "Никто" && compl.includes(name)){
        _bot.BotMsg(ChatId, error_messages['ERROR_CompletedTask'])
        return
    }
    db_.DbEditData('homework', updated, 'complete', id)
    _bot.BotMsg(ChatId, "[" + spec_symbols['SB_success'] + "] Поздравляем! Вам начислено 1 очко!")
    db_.DataBases.changeDB(db_.DataBases.current_db, db_.DataBases.people)
    db_.DbEditData('rating', Number(score) + 1, 'score', player_id)
    return
}

function getName(x, msg, id, ChatId){
    for (let i = 0; i < x.length; i++){
        if (x[i].tg_id == msg.from.id){
            db_.DataBases.changeDB(db_.DataBases.current_db, db_.DataBases.db)
            db_.DbGetData('homework').then(r => completeHomework(r, id, x[i].name, ChatId, x[i].score, x[i].id));
            return
        }
    } 
}

function ratingActivity(text, ChatId, msg){
    db_.DataBases.changeDB(db_.DataBases.current_db, db_.DataBases.people)

    if (text == "Профиль"){
        db_.DbGetData("rating").then(r => checkAuth(r, msg, ChatId))
        return true
    }

    if (text == "Зарегистрироваться"){
        _bot.BotMsg(ChatId, `|${spec_symbols["SB_write"]} Выберите себе имя (воспользуйтесь опцией 'ответить' на это сообщение)`)
        return true
    }

    if (msg.reply_to_message) {
        if (msg.reply_to_message.text == `|${spec_symbols["SB_write"]} Выберите себе имя (воспользуйтесь опцией 'ответить' на это сообщение)`){
            db_.DbAddData("rating", [msg.from.id, msg.from.username, text, 0], 4)
            _bot.BotMsg(ChatId, `|${spec_symbols["SB_success"]} Вы успешно зарегистрировались`)
            return true
        }
    }

    if (msg.reply_to_message) {
        if (msg.reply_to_message.text == `[${spec_symbols["SB_success"]}] Какое по номеру задание вы выполнили?\n (воспользуйтесь опцией 'ответить' на это сообщение)`){
            id = Number(text)
            if (id){
                db_.DataBases.changeDB(db_.DataBases.current_db, db_.DataBases.people)
                db_.DbGetData('rating').then(r => getName(r, msg, id, ChatId));
                return true
        
            }
            else {
                _bot.BotMsg(ChatId, error_messages["ERROR_NotANumber"])
            }
        }
    }

    if (text == "Таблица рейтинга"){
        db_.DbGetData("rating").then(r => showTable(r, ChatId))
        return true
    }
    if (text == "Сообщить о выполнении ДЗ"){
        _bot.BotMsg(ChatId, `[${spec_symbols["SB_success"]}] Какое по номеру задание вы выполнили?\n (воспользуйтесь опцией 'ответить' на это сообщение)`)
        homeW.knowHomework(ChatId)
        return true
        
    }


    return false;
}

module.exports = {ratingActivity}