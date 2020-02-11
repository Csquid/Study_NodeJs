const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'lake0019',
    password: '1234',
    database: 'ns_db'
}) 

connection.connect();

app.listen(3000, function() {
    console.log("start! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/main', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/email_post', function(req, res) {
    //get : req.param('email')
    // console.log(req.body.email);
    // res.send("<h1>welcome " + req.body.email +  "</h1>" );
    res.render('email.ejs', {'email': req.body.email});
});

app.post("/ajax_send_email", function(req, res){
    let email = req.body.email;
    // console.log(req.body.email);

    let responseData = {
        'result': '',
        'detail': {
            'data': {}
        }
    }

    /*
    if(req.body.email !== "") {
        console.log("break if");

        responseData['result'] = 'success';
        responseData['detail']['data']['email'] = req.body.email;
    } else {
        console.log("break else");
        responseData['result'] = 'fail';
        responseData['detail']['data'] = null;
    }
    */

    let query = connection.query('select name from member where email="' + email + '"', function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            responseData.result = 'ok';
            responseData.detail.data.name = rows[0].name;
            console.log(rows[0].name);
            console.log();
        } else {
            responseData.result = 'none';
            responseData.detail.data.name = "";
        }
        res.json(responseData);
    });
});