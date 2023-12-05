const {teachers, lessons_code, to_code_translate} = require("../BotConfig/config_lectures")

function getTeachers(t){
    var text0 = ''

    function answer(subj, lec, sem){
        let answ = ''
        answ += `\n| Предмет: <b><u>${subj}</u>\n|\n</b>`
        answ += `| Лектор: <b>${lec}\n|\n</b>`
        answ += `| Семинарист: <b>${sem}\n\n</b>`

        return answ
    }
    for (var x in to_code_translate){
        if (t.includes(x)){
            var code = to_code_translate[x]
            var get1 = code + '_lectures'
            var get2 = code + '_seminars'
            text0 += answer(lessons_code[code], teachers[get1], teachers[get2])
            
            break
        }
    }

    if (text0 === ''){
        for (var x in to_code_translate){
            var between = ''
            var code = to_code_translate[x]
            var get1 = code + '_lectures'
            var get2 = code + '_seminars'
            between += answer(lessons_code[code], teachers[get1], teachers[get2])

            if (!text0.includes(between)){
                text0 += between
            }
    }
}
return text0

}

function getTeacherBySurname(txt_){
    let sr_ = String(txt_.split('?')[1])
    let text1 = '';

    for (var x in teachers){
        if (teachers[x].includes(sr_)){
            text1 += `ФИО: <b>${teachers[x]}</b>\n\n`
            text1 += `Предмет: <b>${lessons_code[x]}</b>\n\n`
            break
        }
    }

    if (text1 === ''){
        return error_messages["ERROR_TeacherNotFound"]
    }
    return text1
}

module.exports = {getTeachers, getTeacherBySurname}