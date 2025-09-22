<<<<<<< HEAD
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;
=======
  const Sequelize = require("sequelize");

  const sequelize = new Sequelize("postgres", "postgres", "Vyo6JywUn96CFPuU", {
    host: "db.qsyxrexhxeiwsygsaxor.supabase.co",
    dialect: "postgres"
  });

  module.exports = sequelize;
>>>>>>> e7aa6095299afbb5c053fe5fdb42515b9bdaa284
