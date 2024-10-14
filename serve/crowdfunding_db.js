const mysql = require('mysql');

// Import our db details
var db = require("./db_details.js");

// Create db Connection
module.exports = {
    getConnection: ()=>{
        return mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.database 
        });
    }
};
