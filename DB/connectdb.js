const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  Host: 'dpg-d1sd4qre5dus739inobg-a',
  Database: 'postgres_shreexpress',
  User: 'postgres_shreexpress_user',
  Password: 'HDzJDZE6p1Eav8oUihP0ct843GBAZ1Hp',
  Port: 5432,
  connectionString: "postgresql://postgres_shreexpress_user:HDzJDZE6p1Eav8oUihP0ct843GBAZ1Hp@dpg-d1sd4qre5dus739inobg-a.oregon-postgres.render.com/postgres_shreexpress",
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
