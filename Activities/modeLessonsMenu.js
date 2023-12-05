const {lessons_info_cmds} = require("../BotConfig/config_general")

const _bot = require("../ROOT/BOT")
const parse = require("../ExternalCommands/GetLessonsFromMireaUtility")

const menuActivity = require("../Activities/modeMainMenu")

function lessonsGetActivity(text, ChatId){
    if (text == "Расписание"){
        _bot.bot.sendMessage(ChatId, 'Расписание - Выбери день:', {
            reply_markup: {
                keyboard: [
                    ["Понедельник", "Вторник", "Среда"],
                    ["Четверг", "Пятница", "Суббота"],
                    ["Вернуться в меню"]
                ]
            }
        })
        menuActivity.Modes.lessonsMode = true;
    }
    for (let cmd1 in lessons_info_cmds) {
        if (!menuActivity.Modes.lessonsMode){
            break
        }
        if (text.includes(lessons_info_cmds[cmd1])) {
            parse.getData(text.toLowerCase()).then(r => _bot.bot.sendMessage(ChatId, r, {
                reply_markup: {
                    keyboard: [
                        ["Понедельник", "Вторник", "Среда"],
                        ["Четверг", "Пятница", "Суббота"],
                        ["Вернуться в меню"]
                    ]
                }, 
                parse_mode: "html"
            }));
            return true;
        }
    }
}

module.exports = {lessonsGetActivity}