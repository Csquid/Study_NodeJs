const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router/index');
const middle_member = require('./router/member');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
// const sessionOption = require('./private/session.json');
// const FileStore = require('session-file-store')(session);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(function(err, req, res, next) {
    console.log(err);
});

app.listen(9000, function() {
    console.log("start! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(router, middle_member);