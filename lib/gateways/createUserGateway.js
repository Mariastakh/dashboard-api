module.exports = (options) => {
  const db = options.db;
  const user = options.user;

  return {
    execute: async (user) => {
      try {
        await db.query(
          "INSERT INTO member (username, password, email) VALUES ($1, $2, $3)",
          [user.username, user.password, user.email]
        );

        const result = await db.query(
          "SELECT username, member_id FROM member where username =$1",
          [user.username]
        );
        const created_user = result.rows[0].member_id;

        return created_user;
      } catch (err) {
        console.log(err);
      }
    },
  };
};
