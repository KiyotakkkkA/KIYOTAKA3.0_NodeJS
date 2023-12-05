const SQLite3 = require("sqlite3").verbose();


var DataBases = {
    db: new SQLite3.Database('./Storage/data.db'),
    people: new SQLite3.Database('./Storage/people.db'),

    query: undefined, 
    current_db: undefined,

    changeDB: function(current_db, new_database){
        DataBases.current_db = new_database;
        DataBases.query = (command, method = 'all') => {
            return new Promise((resolve, reject) => {
            DataBases.current_db[method](command, (error, result) => {
                if (error) {
                reject(error);
                } else {
                resolve(result);
                }
            });
            });
        }
    }
}

DataBases.current_db = DataBases.db

// Create query to database
DataBases.query = (command, method = 'all') => {
    return new Promise((resolve, reject) => {
        DataBases.current_db[method](command, (error, result) => {
        if (error) {
        reject(error);
        } else {
        resolve(result);
        }
    });
    });
};

// Get data from database
async function DbGetData(table){
    return await DataBases.query(`SELECT * FROM ${table}`);
}

// Add data to database
async function DbAddData(table, array, columns_num){
    let str = ""
    for (let i = 0; i < columns_num; i++){
        str += `, "${array[i]}"`
    }
    return await DataBases.query(`INSERT INTO ${table} VALUES (Null${str})`);
}

// Update date from database
async function DbEditData(table, data, col, id){
    DataBases.current_db.run(`UPDATE ${table} SET ${col} = ? WHERE id = ?`, [data, id]);
}

async function DbDeleteData(table, id){
    return await DataBases.query(`DELETE FROM ${table} WHERE id = ${id}`);
}

module.exports = {DbAddData, DbDeleteData, DbEditData, DbGetData, DataBases}