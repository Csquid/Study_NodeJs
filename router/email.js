const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const connectionMysql = require('../public/js/mysql.js');

/* DataBase Setting */
connectionMysql.connect();

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