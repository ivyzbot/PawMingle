const usersMdl = require('../models/users');

module.exports = {
  signup,
  // getSigninDetails,
  // signin,
  // signout,
  // updateDetails,
};

async function signup(req, res) {
  try {
    const userData = await usersMdl.createUser(req.body);
    console.log('controller-signup', userData);
    if (!userData.success) {
      res.status(400).json({ errorMsg: userData.error });
      return;
    }
    res.json(userData);
  } catch (err) {
    console.log('controller-signup-err', err);
    res.status(500).json({ errorMsg: err.message });
  }
}
// async function getSigninDetails(req, res) {}
// async function signin(req, res) {}
// async function signout(req, res) {}
// async function updateDetails(req, res) {}
