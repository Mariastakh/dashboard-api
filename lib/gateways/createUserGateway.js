module.exports = (options) => {
  const db = options.db;
  const user = options.user;

  return {
    execute: async (user) => {
      try {
        const created_user = await db.query(
          "INSERT INTO member (username, password, email) VALUES ($1, $2, $3)",
          [user.username, user.password, user.email]
        );
        return created_user;
      } catch (err) {
        console.log(err);
      }
    },
  };
};
