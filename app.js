const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log("start! express server on port 3000");
});

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/main', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/email_post', function(req, res) {
    //get : req.param('email')
   res.send("post response");
});