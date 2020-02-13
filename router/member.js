const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const mysql = require("mysql");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/* DataBase Setting */
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'lake0019',
  password: '1234',
  database: 'ns_db'
});

connection.connect();

router.get('/join', function (req, res) {
  // res.sendFile(path.join(__dirname, '../public/join.html'));
  let msg;
  const errorMsg = req.flash('error');

  if(errorMsg) {
    msg = errorMsg;
  }

  res.render('join.ejs', {'message': msg});
});

/* 차후에 login부분에서 쓰면 될 것 같음 */
passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pw_1',
    passReqToCallback: true
  }, function (req, email, pw_1, done) {
    const query = connection.query('select * from member where email=?', [email], function(err, rows) {
      if(err) return done(err);

      if(rows.length) {
        console.log('existed user');
        return done(null, false, {message: 'your email is already used'});
      } else {

      }
    });
  }
));

router.post('/join', passport.authenticate('local-join', {
  successRedirect: '/',
  failureRedirect: '/member/join',
  failureFlash: true 
}));

/*
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
*/
module.exports = router;