const root = require("./ROOT/ROOT");
const _bot = require("./ROOT/BOT")

const {spec_symbols} = require("./BotConfig/config_messages")

const gteachers = require("./ExternalCommands/GetTeachersUtility")

const menuActivity = require("./Activities/modeMainMenu")
const lessonsActivity = require("./Activities/modeLessonsMenu")
const homeworkActivity = require("./Activities/modeHomeworkMenu")
const ratingActivity = require("./Activities/modeRatingMenu")
const feedbackActivity = require("./Activities/modeFeedbackMenu")
const adminpanelActivity = require("./Activities/modeAdminPanelMenu")

// Random int func
function randint(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

_bot.bot.on("message", msg => {
    const ChatId = msg.chat.id;
    const got_text = msg.text;

    var text = '';

    if (got_text !== undefined){
        text = got_text

        adminpanelActivity.AdminPanelActivity(text, ChatId, msg)

        if (adminpanelActivity.Settings.__BLOCKED__){
            if (!adminpanelActivity.enableBot(text, ChatId, msg)){
                _bot.BotMsg(ChatId, "[" + spec_symbols['SB_error'] + "] Администратор отключил приём сообщений!")
                return
            }
        }

        else{

            try {

                if (msg.text.includes('@db')){
                    _bot.BotMsg(ChatId, `[${spec_symbols["SB_success"]}] Меню скрыто`)
                    return
                }
    
                // INTRODUCE
                if (text == "/start"){
                    _bot.BotMsg(ChatId, "Привет, я <b><u>Киё</u></b> - лучший бот для <b><u>лучших студентов</u></b> РТУ МИРЭА!\n\nИспользуй <b><u>/menu</u></b> чтобы увидеть мой функционал")
                }
        
                // MAIN KIYO BLOCK
                if (menuActivity.mainMenuActivity(text, ChatId, msg)) return 
        
                // FUNC 1 - LESSONS CHECK
                if (lessonsActivity.lessonsGetActivity(text, ChatId)) return
        
                // FUNC 2 - HOMEWORK MANAGER
                if (homeworkActivity.homeworkManageActivity(text, ChatId, msg)) return
        
                // FUNC 3 - GETTING TEACHERS
                if (text == "Преподаватели"){
                    _bot.BotMsg(ChatId, "| Педсостав |\n" + gteachers.getTeachers(msg.text))
                    return
                }
        
                // FUNC 4 - RATING
                if (ratingActivity.ratingActivity(text, ChatId, msg)) return
    
                // FUNC 5 - FEEDBACK
                if (feedbackActivity.feedbackActivity(text, ChatId, msg)) return
        
            }
            catch (e){
                console.log('cant handle message', e)
            }

        }

    }
})