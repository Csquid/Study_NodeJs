const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connectionMysql = require('../../public/js/mysql.js');

const connection = connectionMysql.connect();

router.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, '../public/join.html'));
    let msg;
    const errorMsg = req.flash('error');

    if (errorMsg) {
        msg = errorMsg;
    }
    /* ejs path: /views/ */
    res.render('./member/login.ejs', { 'message': msg });
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    passReqToCallback: true
}, function (req, id, pw, done) {
        /* mysql을 통하여 클라이언트에서 가져온 id값을 가지고 select를 한다. */
        const query = connection.query('select * from member where id=?', [id], function (err, rows) {
            if (err) return done(err);
             
            /* id가 존재 */
            if (rows.length) {
                /* mysql을 통하여 클라이언트에서 가져온 id, pw 값을 select를 한다. */
                const query = connection.query('select * from member where id=? AND pw=?', [id, pw], function(err, rows) {

                    if(err) return done(err);

                    if(rows.length > 0) {
                        return done(null, {'user_id': id, 'idx': rows[0].member_idx});
                    } else {
                        return done(null, false, { message: 'ID and password do not match'})
                    }

                });
            } else {    /* id가 존재하지않음 */
                console.log('dont found user account');
                return done(null, false, { message: 'dont found user account' });
            }
        });
    }
));

router.post('/', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        /* return 해줄 데이터 초기화 */
         let resultData = {
             signal: null,
             data: {},
             err: ''
         };
         
         if(err) {
            req.statusCode(500).json(err);
         }
 
         if(!user) { 
             resultData.signal = false;
             resultData.data = null;
             resultData.err = info.message;
 
             return res.json(resultData);
         }
 
         req.login(user, function(err) {
             if(err) { return next(err); }
 
             resultData.signal = true;
             resultData.data.user = user;
             resultData.err = null;
 
             return res.json(resultData);
         });
 
    })(req, res, next);
 });

module.exports = router;