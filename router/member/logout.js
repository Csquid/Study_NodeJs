const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
    console.log('logout break');

    if(req.session.passport !== undefined) {
        delete req.session.passport;

        res.end();
    }
    res.end();
});

module.exports = router;