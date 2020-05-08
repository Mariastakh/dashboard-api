module.exports = (options) => {
  const gateway = options.gateway;

  if (options.user.username == null && options.user.password == null) {
    return "No username or password enterred";
  } else if (options.user.username == null) {
    return "No username enterred";
  } else if (options.user.password == null) {
    return "No password enterred";
  }

  if (gateway.execute(options.user) === "Username not recognised") {
    return "Username not recognised";
  }
  if (gateway.execute(options.user) === "Incorrect password") {
    return "Incorrect password";
  } else if (gateway.execute(options.user) === "Login successful!") {
    return "Login successful!";
  }

  return "default response";
};
