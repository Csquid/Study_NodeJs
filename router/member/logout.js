const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
    if(req.session.passport !== undefined) {
        delete req.session.passport;

        res.end();
    } else {
        res.end(JSON.stringify(''))
    }
    res.end();
});

module.exports = router;