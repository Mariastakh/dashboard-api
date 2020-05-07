module.exports = (options) => {
  if (options.username == null && options.password == null) {
    return "No username or password enterred";
  } else if (options.username == null) {
    return "No username enterred";
  } else if (options.password == null) {
    return "No password enterred";
  }
};
