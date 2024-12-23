const mysql = require('mysql');

let dbInstance = null;

const initdb = () => {
    if (!dbInstance) {
        dbInstance = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Prem@002#",
            database: "register"
        })


        dbInstance.connect((err)=>{
            if(err){
                console.error("Mysql connection error",err)
            }
            else{
                console.log('Connected to Mysql database')
            }
        })
    }
    return dbInstance;
}

module.exports = initdb();