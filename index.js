const express = require("express");
const sequelize = require("./config/database");
const User = require("./models/User");
const Iphones = require("./models/Iphones");
const cors = require("cors");

const http = require('http');
const { initSocket, getIO } = require('./socket');

const app = express();
const server = http.createServer(app);
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("The server is running");
});

app.get("/user", async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

app.post("/user", async (req, res) => {
  try {
    const newUser = await User.create({
      username: "New User",
      email: "new-user" + Date.now() + "@example.com",
    });
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.put("/user/:id", async (req, res) => {
  const updatedUser = await User.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedUser);
});

app.delete("/user/:id", async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.send(`Delete User with ID ${req.params.id}`);
});

app.get("/iphones", async (req, res) => {
  const allIphones = await Iphones.findAll();
  res.json(allIphones);
});


app.post("/iphones", async (req, res) => {
  try {
    const newIphone = await Iphones.create(req.body);
    // Emite atualização em tempo real
    const io = getIO();
    const iphones = await Iphones.findAll();
    io.emit('iphones', iphones);
    res.status(201).json(newIphone);
  } catch (error) {
    console.error("Error creating iPhone:", error);
    res.status(500).json({ error: "Failed to create iPhone" });
  }
});


app.put("/iphones/:id", async (req, res) => {
  const updatedIphone = await Iphones.update(req.body, {
    where: { id: req.params.id },
  });
  // Emite atualização em tempo real
  const io = getIO();
  const iphones = await Iphones.findAll();
  io.emit('iphones', iphones);
  res.json(updatedIphone);
});


app.delete("/iphones/:id", async (req, res) => {
  await Iphones.destroy({ where: { id: req.params.id } });
  // Emite atualização em tempo real
  const io = getIO();
  const iphones = await Iphones.findAll();
  io.emit('iphones', iphones);
  res.send(`Delete iPhone with ID ${req.params.id}`);
});


// Rotas duplicadas removidas


sequelize
  .sync({ alter: true }) // cria/atualiza tabelas
  .then(() => {
    console.log("Conectado ao Supabase/Postgres");
    // Inicializa o socket.io
    const io = initSocket(server);

    // Evento de conexão do socket
    io.on('connection', async (socket) => {
      console.log('Novo cliente conectado:', socket.id);
      // Envia os dados dos iPhones ao conectar
      const iphones = await Iphones.findAll();
      socket.emit('iphones', iphones);

      // Evento para buscar todos os iPhones em tempo real sob demanda
      socket.on('getIphones', async () => {
        const iphonesAtualizados = await Iphones.findAll();
        socket.emit('iphones', iphonesAtualizados);
      });
    });

    // Inicia o servidor HTTP
    server.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
  })
  .catch((err) => console.error("Erro ao conectar ao banco:", err));
