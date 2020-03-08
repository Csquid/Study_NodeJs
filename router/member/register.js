const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('./member/join.ejs', {'message': msg})
});

module.exports = router;