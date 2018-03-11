const ws = require('ws');
const config = require('./config');
const peers = config.peers;

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }
  listen() {
    const server = new ws.Server({ port: config.p2p_port });
    server.on('connection', socket => this.connectSocket(socket));

    this.connectToPeers();

    console.log(`P2P server listening on ${config.p2p_port}`);
  }
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected !');
  }
  connectToPeers() {
    peers.forEach(peer => {
      const socket = new ws(peer);

      socket.on('open', _ => this.connectSocket(socket));
      });
  }
}

module.exports = P2pServer;
