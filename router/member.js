const express = require('express');
const router = express.Router();

const login = require('./member/login');
const logout = require('./member/logout');
const register = require('./member/register');
const overlap = require('./member/overlap');

router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/overlap', overlap);

// router.get('/register', function(req, res) {
//     res.render('./member/register.ejs', {'message': msg})
// });

module.exports = router;