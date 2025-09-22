const express = require("express");
const sequelize = require("./config/database");
const User = require("./models/User");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

sequelize
  .authenticate()
  .then(() => {
    app.listen(port, () =>
      console.log(
        `Database connected successfully and app listening on port ${port}`
      )
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
