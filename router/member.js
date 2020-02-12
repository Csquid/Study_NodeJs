const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const mysql = require("mysql");

/* DataBase Setting */
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'lake0019',
    password: '1234',
    database: 'ns_db'
}) ;

connection.connect();

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/join.html'));
});

module.exports = router;