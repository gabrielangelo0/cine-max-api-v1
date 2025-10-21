const express = require("express");
const app = express();
const sequelize = require("../src/config/database");
const moviesRoutes = require('../src/routes/movies.route')

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(moviesRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("Banco de dados conectado com sucesso"))
  .catch((error) => {
    console.log(error.message);
  });

module.exports = app;
