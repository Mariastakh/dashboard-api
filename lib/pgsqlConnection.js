const Pool = require("pg").Pool;

const pool = new Pool({
  user: "dashboarduser",
  host: "localhost",
  database: "dashboarddb",
  password: "12345",
  port: 5432,
});

exports.pool = pool;
