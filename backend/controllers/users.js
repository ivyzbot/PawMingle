const usersMdl = require('../models/users');

module.exports = {
  signup,
  getSigninDetails,
  signin,
  signout,
  addPetToUser,
  getUerPets,
  // updateDetails,
};

async function signup(req, res) {
  try {
    const userData = await usersMdl.createUser(req.body);
    // console.log('controller-signup', userData);
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

async function getSigninDetails(req, res) {
  const email = req.params.email;
  console.log('model email', email);
  try {
    const userData = await usersMdl.getUser({ email: email });
    if (!userData.success) {
      res.status(400).json({ errorMsg: userData.error });
      return;
    }
    console.log('controller-signin-get', userData.data);
    res.json(userData.data);
  } catch (err) {
    console.log('controller-signin-err', err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function signin(req, res) {
  try {
    const data = await usersMdl.signinUser(req.body);
    if (!data.success) {
      res.status(400).json({ errorMsg: data.error });
      return;
    }
    console.log('controller-signin-post', data.data);
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}
async function signout(req, res) {
  try {
    const data = await usersMdl.signoutUser(req.body);
    if (!data.success) {
      res.status(400).json({ errorMsg: data.error });
      return;
    }
    console.log('controller-signout', data.data);
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function addPetToUser(req, res) {
  try {
    const userData = await usersMdl.addPetToUser(req.body);
    // console.log('controller-add pet', userData);
    if (!userData.success) {
      res.status(400).json({ errorMsg: userData.error });
      return;
    }
    res.json(userData);
  } catch (err) {
    console.log('controller-add pet', err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getUerPets(req, res) {
  const userID = req.params.userid;
  try {
    const userData = await usersMdl.getUerPets(userID);
    // console.log('controller-getUserPets', userData);
    if (!userData.success) {
      res.status(400).json({ errorMsg: userData.error });
      return;
    }
    res.json(userData);
  } catch (err) {
    console.log('controller-get-user-pets-err', err);
    res.status(500).json({ errorMsg: err.message });
  }
}

// async function updateDetails(req, res) {}
