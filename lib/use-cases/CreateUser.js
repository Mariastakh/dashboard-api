const bcrypt = require("bcrypt");

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
}

module.exports = async (options) => {
  const user = options.user;
  const db = options.db;
  user.password = await hashPassword(user.password);

  const response = await options.gateway.execute(user);
  return response;
};
