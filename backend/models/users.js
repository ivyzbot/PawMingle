const usersDao = require('../daos/users');

module.exports = {
  createUser,
};

async function createUser(body) {
  const user = await usersDao.findOne({ email: body.email });
  if (user) {
    return { success: false, error: 'User already exists' };
  }
  const newUser = await usersDao.create(body);
  return { success: true, data: newUser };
}
