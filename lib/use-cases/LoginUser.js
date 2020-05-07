module.exports = (options) => {
  if (options.user.username == null && options.user.password == null) {
    return "No username or password enterred";
  } else if (options.user.username == null) {
    return "No username enterred";
  } else if (options.user.password == null) {
    return "No password enterred";
  }

  if (options.gateway.execute(options.user) === "Username not recognised") {
    return "Username not recognised";
  }
  if (options.gateway.execute(options.user) === "Incorrect password") {
    return "Incorrect password";
  } else if (options.gateway.execute(options.user) === "Login successful!") {
    return "Login successful!";
  }

  return "default response";
};
