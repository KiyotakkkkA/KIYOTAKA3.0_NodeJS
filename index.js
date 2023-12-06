const root = require("./ROOT/ROOT");
const _bot = require("./ROOT/BOT")

const {spec_symbols} = require("./BotConfig/config_messages")

const gteachers = require("./ExternalCommands/GetTeachersUtility")

const menuActivity = require("./Activities/modeMainMenu")
const lessonsActivity = require("./Activities/modeLessonsMenu")
const homeworkActivity = require("./Activities/modeHomeworkMenu")
const ratingActivity = require("./Activities/modeRatingMenu")
const feedbackActivity = require("./Activities/modeFeedbackMenu")

var __BLOCKED__ = false;

// Random int func
function randint(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

_bot.bot.on("message", msg => {
    const ChatId = msg.chat.id;
    const got_text = msg.text;

    var text = '';

    if (got_text !== undefined){

        // BLOCKED MODE //
        if (Number(msg.from.id) === root.__ROOT_ID__ && msg.text.includes('@ddat')){
            __BLOCKED__ = !__BLOCKED__
            _bot.BotMsg(ChatId, `[${spec_symbols["SB_success"]}] Статус блокировки изменён на: |${__BLOCKED__}|`)
            return
        }
        if (__BLOCKED__){
            _bot.BotMsg(ChatId, `[${spec_symbols["SB_error"]}] Заблокировано`)
            return
        }

        if (msg.text.includes('@db')){
            _bot.BotMsg(ChatId, `[${spec_symbols["SB_success"]}] Меню скрыто`)
            return
        }
        // BLOCKED MODE //

        text = got_text
        try {
            // INTRODUCE
            if (text == "/start"){
                _bot.BotMsg(ChatId, "Привет, я <b><u>Киё</u></b> - лучший бот для <b><u>лучших студентов</u></b> РТУ МИРЭА!\n\nИспользуй <b><u>/menu</u></b> чтобы увидеть мой функционал")
            }
    
            // MAIN KIYO BLOCK
            menuActivity.mainMenuActivity(text, ChatId)
    
            // FUNC 1 - LESSONS CHECK
            lessonsActivity.lessonsGetActivity(text, ChatId)
    
            // FUNC 2 - HOMEWORK MANAGER
            homeworkActivity.homeworkManageActivity(text, ChatId, msg)
    
            // FUNC 3 - GETTING TEACHERS
            if (text == "Преподаватели"){
                _bot.BotMsg(ChatId, "| Педсостав |\n" + gteachers.getTeachers(msg.text))
            }
    
            // FUNC 4 - RATING
            ratingActivity.ratingActivity(text, ChatId, msg)

            // FUNC 5 - FEEDBACK
            feedbackActivity.feedbackActivity(text, ChatId, msg)
    
        }
        catch (e){
            console.log('cant handle message', e)
        }
    }
})