module.exports = (options) => {
  const user = options.user;
  const db = options.db;

  return {
    execute: async (user) => {
      db.query("SELECT username, password FROM member where username =$1", [
        user.username,
      ]);
    },
  };
};
