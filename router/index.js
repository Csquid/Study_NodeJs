const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const main = require('./main');
const email = require('./email');
const member = require('./member');

router.use('/main', main);
router.use('/email', email);
router.use('/member', member);

router.get('/', function(req, res) {
    console.log("indexjs / path loaded");
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

module.exports = router;