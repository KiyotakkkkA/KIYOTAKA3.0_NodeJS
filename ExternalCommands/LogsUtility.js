var fs = require("fs")

function logger(msg, act){
    let dat = new Date()

    let log_ = `TIME: ${dat} - NAME: ${msg.from.username} - ID: ${msg.from.id} - ACTION: ${act}\n`

    fs.open(`./Logs/${dat.toLocaleDateString()}Logs.txt`, 'a+', (err) => {
        if(err) throw err;
    });

    fs.appendFile(`./Logs/${dat.toLocaleDateString()}Logs.txt`, log_, (err) => {
        if (err) throw err
    })
}

module.exports = {logger}