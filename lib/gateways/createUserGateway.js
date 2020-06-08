module.exports = (options) => {
  const db = options.db;
  const user = options.user;

  const createUser = async (user) => {
    return await db.query(
      "INSERT INTO member (username, password, email) VALUES ($1, $2, $3)",
      [user.username, user.password, user.email]
    );
  };

  return {
    execute: async (user) => {
      try {
        await createUser(user);
      } catch (err) {
        if (
          err.message ===
          'duplicate key value violates unique constraint "member_username_key"'
        ) {
          throw new Error("Username already exists");
        } else if (
          err.message ===
          'duplicate key value violates unique constraint "member_email_key"'
        ) {
          throw new Error("Email already exists");
        } else {
          console.log(err);
          throw err;
        }
      }
    },
  };
};
