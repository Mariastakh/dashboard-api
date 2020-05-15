module.exports = (options) => {
  const user = options.user;
  const db = options.db;

  return {
    execute: async (user) => {
      try {
        console.log(user);
        const user_id = await db.query(
          "SELECT member_id FROM member where username =$1",
          [user]
        );
        console.log(user_id.rows[0].member_id);
        const thing = await db.query(
          "SELECT name, status FROM task where owner =$1",
          [user_id.rows[0].member_id]
        );
        console.log(thing.rows);
        return thing;
      } catch (error) {
        // console.log("inside gateway error catch block");
        throw error;
      }
    },
  };
};
