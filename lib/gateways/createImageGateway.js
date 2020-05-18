module.exports = (options) => {
  const db = options.db;

  return {
    execute: async (user, image) => {
      try {
        const created_image = await db.query(
          "INSERT INTO image (user_id, name) VALUES ($1, $2)",
          [user, image]
        );
        return created_image;
      } catch (err) {
        console.log(err);
      }
    },
  };
};
