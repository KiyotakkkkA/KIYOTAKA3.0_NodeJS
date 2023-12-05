const spec_symbols =  {
    'SB_success': '✔',
    'SB_error': '✖',
    'SB_edit': '✎',
    'SB_write': '📝',
}

module.exports = {
    spec_symbols: {
        'SB_success': '✔',
        'SB_error': '✖',
        'SB_edit': '✎',
        'SB_write': '📝',
        'SB_trash': '🗑',
    },
    
    error_messages:{
        'ERROR_NotANumber': `[${spec_symbols["SB_error"]}] Ошибка! Это не число!`,
        'ERROR_NotAString': `[${spec_symbols["SB_error"]}] Ошибка! Недопустимый формат!`,
        'ERROR_WrongForm': `[${spec_symbols["SB_error"]}] Ошибка! Неверная форма записи!`,
        'ERROR_WrongTimeMarkers': `[${spec_symbols["SB_error"]}] Ошибка! Недопустимое сочетание временных указателей!`,
        'ERROR_OutOfIndex': `[${spec_symbols["SB_error"]}] Ошибка! Такого номера тут нет!`,
    
        'ERROR_NullDatabase': `[${spec_symbols["SB_error"]}] Ошибка! Здесь ничего нет!`,
        'ERROR_TeacherNotFound': `[${spec_symbols["SB_error"]}] Ошибка! Преподаватель не найден!`,
        'ERROR_FullQueue': `[${spec_symbols["SB_error"]}] Ошибка! Кто то уже этим пользуется!`,
        'ERROR_CompletedTask': `[${spec_symbols["SB_error"]}] Ошибка! Вы уже выполнили это задание!`
    },
    
    info_messages:{
        'INFO_NoHomework': `[${spec_symbols["SB_success"]}] Ничего не задали!`,
    }
}