const Pool = require("pg").Pool;

const pool = new Pool({
  // user: process.env.PRODUCTION_DB_USER,
  // host: process.env.PRODUCTION_DB_HOST,
  // database: process.env.PRODUCTION_DB,
  // password: process.env.PRODUCTION_DB_PASSWORD,
  // port: process.env.PRODUCTION_DB_PORT,
  user: "dashboarduser",
  host: "localhost",
  database: "dashboarddb",
  password: "12345",
  port: 5432,
});

exports.pool = pool;
