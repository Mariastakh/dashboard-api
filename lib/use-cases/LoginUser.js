async function checkPasswordsMatch(password, hashedPassword) {
  try {
    await bycrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Username or password doesn't match!");
  }
}

module.exports = async (options) => {
  if (options.user.username == null && options.user.password == null) {
    return "No username or password enterred";
  } else if (options.user.username == null) {
    return "No username enterred";
  } else if (options.user.password == null) {
    return "No password enterred";
  }

  const user = await options.gateway.execute();
  if (user.length == 0) {
    throw new Error("Username or password doesn't match!");
  } else {
    checkPasswordsMatch;

    return user;
  }
};
