const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
    console.log("main.js");
    res.sendFile(path.join(__dirname, "../public/main.html"));
    console.log("break");
});

module.exports = router;