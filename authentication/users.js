const bcrypt = require('bcrypt');
const users = require('../db/users.json');

const verifyUser = (username, password) => {
  const hashedPassword = users[username];
  const saltRounds = 12;
  if(!hashedPassword){
    return false;
  }
  return bcrypt.compareSync(password, hashedPassword, saltRounds);
};

module.exports = { verifyUser };
