const mysql = require("mysql");

const SQL_INFOS = new function() {
    this.HOST = "localhost";
    this.USER = "root";
    this.PASSWORD = "";
    this.DB_NAME = "adcap";
}

let mysqlCo = mysql.createConnection({
    host: SQL_INFOS.HOST,
    user: SQL_INFOS.USER,
    password: SQL_INFOS.PASSWORD,
    database: SQL_INFOS.DB_NAME
});

mysqlCo.connect((error) => {
    if (error) {
        console.error("mysql -> error:" + error.code + " message:" + error.message);
    } else {
        console.error("mysql -> host:" + SQL_INFOS.HOST + " connected to database:" + SQL_INFOS.DB_NAME);
    }
    let query = "SELECT * FROM `stands`";
    mysqlCo.query(query, function(err, results) {
        results.forEach(result => {
            console.log(Object.keys(result));
        });
    })
});