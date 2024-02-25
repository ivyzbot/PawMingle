// const { urlencoded } = require("express");
const usersDao = require('../daos/users');
const petsDao = require('../daos/pets');
const utilSecurity = require('../utilities/security');

module.exports = {
  createUser,
  getUser,
  signinUser,
  signoutUser,
  addPetToUser,
  getUerPets,
};

async function createUser(body) {
  const user = await usersDao.findOne({ email: body.email });
  if (user) {
    return { success: false, error: 'User already exists' };
  }
  const newUser = await usersDao.create(body);
  return { success: true, data: newUser };
}

async function getUser(body) {
  if (!body.hasOwnProperty('email')) {
    return { success: false, error: 'missing email' };
  }

  // console.log('User Model - Get user email in body:', body.email);
  const userEmail = decodeURIComponent(body.email);
  // console.log('User Model - Get user email in body (decoded)', userEmail);
  const signinDetails = await usersDao
    .findOne({
      email: userEmail,
    })
    .select(['name', 'email', 'isAdmin', 'salt', 'iterations']);
  console.log('User Model - Get user login details:', signinDetails);
  return { success: true, data: signinDetails };
}

async function signinUser(body) {
  if (!body.hasOwnProperty('email')) {
    return { success: false, error: 'missing email' };
  } else if (!body.hasOwnProperty('password')) {
    return { success: false, error: 'missing password' };
  }

  const userData = await usersDao.findOne({
    email: body.email,
    password: body.password,
  });

  if (userData == null || Object.keys(userData).length == 0) {
    return { success: false, error: 'Invalid email or password' };
  }

  const jwtPayload = {
    name: userData.name,
    email: userData.email,
    is_admin: userData.isAdmin,
    userID: userData._id,
  };

  const token = utilSecurity.createJWT(jwtPayload);
  const expiry = utilSecurity.getExpiry(token);
  console.log('Token Stored:', token);
  console.log('Token Expiry Time:', expiry);

  const userDataUpdated = await usersDao.updateOne(
    {
      email: body.email,
    },
    { token: token, expire_at: expiry }
  );

  console.log('User Model - Signin:', userDataUpdated);

  return { success: true, data: token };
}

async function signoutUser(body) {
  if (!body.hasOwnProperty('email')) {
    return { success: false, error: 'missing email' };
  }
  const userDataUpdated = await usersDao.updateOne(
    { email: body.email },
    { token: null, expire_at: null }
  );

  console.log('User Model - Signout:', userDataUpdated);

  return { success: true, data: userDataUpdated };
}

async function addPetToUser(body) {
  // console.log('body', body);
  const petData = await petsDao.create(body);
  // console.log('pet data', petData);
  const userData = await usersDao.findById(body.userID);
  // // console.log('add pets to user:', userData);
  userData.petsOwn.push(petData._id);

  await userData.save();
  return { success: true, data: userData };
}

async function getUerPets(userID) {
  const petData = await usersDao
    .findById(userID)
    .populate('petsOwn')
    .select('petsOwn');
  return { success: true, data: petData };
}
