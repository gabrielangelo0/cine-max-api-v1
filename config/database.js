  const Sequelize = require("sequelize");

  const sequelize = new Sequelize("postgres", "postgres", "Vyo6JywUn96CFPuU", {
    host: "db.qsyxrexhxeiwsygsaxor.supabase.co",
    dialect: "postgres"
  });

  module.exports = sequelize;
