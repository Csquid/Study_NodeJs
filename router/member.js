const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const mysql = require("mysql");

/* DataBase Setting */
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: '',
    password: '1234',
    database: 'ns_db'
}) ;

connection.connect();

router.get('/join', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/join.html'));
});

router.post('/join', function(req, res) {
    const body = req.body;

    const reqDataObject = {
        id: body.id,
        pw: body['pw-1'],
        name: body.name,
        email: body.email,
        address: body.address,
        gender: body.gender
    }

    let query = connection.query('INSERT INTO MEMBER SET ?', reqDataObject, function(error, results, fields) {
        if(error) throw error;

        console.log("ok insert db ", results);
    });
    
    // console.log(reqDataObject);
});
module.exports = router;