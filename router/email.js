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

/* Router !! */
router.post('/form', function(req, res) {
    res.render('email.ejs', {'email': req.body.email});
});

router.post("/ajax", function(req, res) {
    let email = req.body.email;

    let responseData = {
        'result': '',
        'detail': {
            'data': {}
        }
    }

    let query = connection.query('select name from member where email="' + email + '"', function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            responseData.result = 'ok';
            responseData.detail.data.name = rows[0].name;
        } else {
            responseData.result = 'none';
            responseData.detail.data.name = "";
        }
        res.json(responseData);
    });
});

module.exports = router;