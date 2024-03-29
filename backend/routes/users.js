var express = require('express');
var usersCtrl = require('../controllers/users');

var router = express.Router();

// under the route /users

router.post('/signup', usersCtrl.signup);
router.get('/signin/:email', usersCtrl.getSigninDetails);
router.patch('/signin', usersCtrl.signin);
router.patch('/signout', usersCtrl.signout);
router.patch('/addpet', usersCtrl.addPetToUser);
router.get('/getpet/:userid', usersCtrl.getUerPets);

// router.patch('/update', usersCtrl.updateDetails);

module.exports = router;
