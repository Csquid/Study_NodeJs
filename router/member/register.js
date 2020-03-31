const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connectionMysql = require('../../public/js/mysql.js');

const connection = connectionMysql.connect();

router.get('/', function (req, res) {
    let msg;
    const errorMsg = req.flash('error');

    if (errorMsg) {
        msg = errorMsg;
    }

    /* ejs path: /views/ */
    res.render('./member/register.ejs', { 'message': msg });
});

router.post('/', function (req, res) {
    const body = req.body;

    console.log(body);

    const reqDataObject = {
        id: body.id,
        pw: body.pw,
        name: body.name,
        email: body.email,
        address: body.address,
        gender: body.gender
    }

    let query = connection.query('INSERT INTO MEMBER SET ?', reqDataObject, function (error, results, fields) {
        if (error) throw error;

        console.log("ok insert db ", results);
    });

    let sendData = {
        "signal": true,
    }

    res.json(sendData);
    

    // console.log(reqDataObject);
});

module.exports = router;