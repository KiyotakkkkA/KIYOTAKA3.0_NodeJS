const db_ = require("./DatabaseUtility")
const _bot = require("../ROOT/BOT")

const {day_modify} = require("../BotConfig/config_general")
const {info_messages} = require("../BotConfig/config_messages")

function knowHomework(chat, target_id=''){
    db_.DataBases.changeDB(db_.DataBases.current_db, db_.DataBases.db)
    db_.DbGetData('homework').then(r => CreateResponce(r));

    function format(id, subj, text, date, complete){
        if (complete == null || complete == "") complete = "Никто"
        var ans = ''
        ans += `ID - <b><em>${id}</em></b>\n`
        ans += `Предмет - <b><em>${subj}</em></b>\n`
        ans += `Задание - <b><em>${text}</em></b>\n`
        ans += `Крайний срок - <b><em>${date}</em></b>\n`
        ans += `Выполнили - <b><em>${complete}</em></b>\n\n`

        return ans
    }

    function CreateResponce(x){
        let end = ""
        // Homework info form
        for (let cell = 0; cell < x.length; cell++){
            if (target_id === ''){
                end += format(x[cell].id, x[cell].subj, x[cell].text, x[cell].date, x[cell].complete)
            }
            else{
                if (day_modify[String(x[cell].date).split(' ')[0].toLowerCase()] === target_id){
                    end += format(x[cell].id, x[cell].subj, x[cell].text, x[cell].date)
                }
            }
        }
        if (end === ''){
            end += info_messages["INFO_NoHomework"]
        }
        _bot.BotMsg(chat, `${end}`)
    }

    return 
}

module.exports = {knowHomework}