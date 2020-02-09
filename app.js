const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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
    console.log(req.body.email);

    let responseData = {
        'result': '',
        'detail': {
            'data': {}
        },
        
    }

    if(req.body.email !== "") {
        console.log("break if");

        responseData['result'] = 'success';
        responseData['detail']['data']['email'] = req.body.email;
    } else {
        console.log("break else");
        responseData['result'] = 'fail';
        responseData['detail']['data'] = null;
    }

    res.json(responseData);
})