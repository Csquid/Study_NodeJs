const express = require('express');
const router = express.Router();

const main = require('./main');
const email = require('./email');
const member = require('./member');
const search = require('./search');

router.use('/main', main);
router.use('/email', email);
router.use('/member', member);
router.use('/search', search);

router.get('/', function(req, res) {
    
    if(req.session.passport) {
        res.render('./main.ejs', {
            'user': req.session.passport.user
        });
    } else {
        res.render('./main.ejs', {
            'user': null
        });
    }
    
});

module.exports = router;