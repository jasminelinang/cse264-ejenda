const postgres = require("postgres");
require("dotenv").config();

const sql = postgres(process.env.SUPABASE_DB_URL, {
  ssl: "require",
});

module.exports = sql;
