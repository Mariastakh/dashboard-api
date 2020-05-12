module.exports = (options) => {
  const user = options.user;
  const db = options.db;

  return {
    execute: (user) => {
      try {
        return db.query(
          "SELECT username, password FROM member where username =$1",
          [user.username]
        );
      } catch (error) {
        // console.log("inside gateway error catch block");
        throw error;
      }
    },
  };
};
