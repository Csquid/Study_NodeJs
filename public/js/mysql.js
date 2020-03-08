const mysql = require("mysql");
const mysqlLoginData = require('../../private/mysql.json');

function mysqlConnect() {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: mysqlLoginData.id,
        password: mysqlLoginData.pw,
        database: 'ns_db'
    });

    connection.connect();

    return connection;
}

module.exports.connect = mysqlConnect;