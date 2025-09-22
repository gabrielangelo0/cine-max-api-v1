// Adicione este arquivo para inicializar o socket.io e exportar a instância
const { Server } = require('socket.io');
let io = null;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io não inicializado!');
  }
  return io;
}

module.exports = { initSocket, getIO };