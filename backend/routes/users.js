var express = require('express');
var usersCtrl = require('../controllers/users');

var router = express.Router();

// under the route /users

router.post('/signup', usersCtrl.signup);

// router.get('/signin', usersCtrl.getSigninDetails);
// router.post('/signin', usersCtrl.signin);
// router.post('/signout', usersCtrl.signout);
// router.patch('/update', usersCtrl.updateDetails);

module.exports = router;
