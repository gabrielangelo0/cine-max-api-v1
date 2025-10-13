const express = require("express");
const app = express();
const sequelize = require("./config/database");
const User = require("./models/User");
const Movies = require("./models/Movies");
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movies.findAll();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/movies", async (req, res) => {
  try {
    console.log(req.body);
    await Movies.create(req.body);

    res.status(201).json({ message: "Movie created successfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/movies/:id", (req, res) => {
  res.send(`Update Movie with ID ${req.params.id}`);
});

app.delete("/movies/:id", (req, res) => {
  res.send(`Delete Movie with ID ${req.params.id}`);
});

sequelize
  .sync({ alter: true })
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
