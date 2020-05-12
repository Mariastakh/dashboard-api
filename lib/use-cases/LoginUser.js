const bcrypt = require("bcryptjs");

module.exports = async (options) => {
  if (options.user.username == null && options.user.password == null) {
    return "No username or password enterred";
  } else if (options.user.username == null) {
    return "No username enterred";
  } else if (options.user.password == null) {
    return "No password enterred";
  }

  const user = await options.gateway.execute(options.user);

  if (user.rows.length == 0) {
    throw new Error("Username or password doesn't match!");
  } else {
    await bcrypt
      .compare(options.user.password, user.rows[0].password)
      .then((res) => {
        console.log(res);
        if (res == false) {
          throw new Error("Password didn't match");
        }
      })
      .catch((err) => {
        console.error(err.message);
        throw new Error("password or username didn't match");
      });
  }
};
