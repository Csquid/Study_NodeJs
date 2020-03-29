const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connectionMysql = require('../../public/js/mysql.js');

const connection = connectionMysql.connect();

router.post('/id', function (req, res) {
    overlapCheck("id", req.body.id, res);
});

router.post('/email', function (req, res) {
    overlapCheck("email", req.body.email, res);
});

/* 
    prop - id or email 
    res가 필요한 이유: res를 이용하여 바로 전송시키기 위해
*/
function overlapCheck(prop, selectData, res) {
    
    let query = connection.query(`SELECT * FROM member where ${prop} = ?`, selectData , function (error, results) {
        let sendData = {
            signal: null,
            overlap: null
        };

        if (error) {
            sendData.signal = false;
            throw error;
        }

        sendData.signal = true;

        if(results.length) {
            /* 만약 중복이라면 true */
            sendData.overlap = true;
        } else {
            /* 만약 중복이 아니라면 false */
            sendData.overlap = false;
        }
        
        console.log(results);
        res.json(sendData);
    });

}


module.exports = router;