// server/db/index.js
const postgres = require("postgres");
require("dotenv").config();

const sql = postgres({
  host: "aws-0-us-west-2.pooler.supabase.com",
  port: 5432,
  database: "postgres",
  username: "postgres.mbmvmdwxbbksczouzurq",
  password: process.env.SUPABASE_DB_PASSWORD,
  ssl: "require",
});

module.exports = sql;
