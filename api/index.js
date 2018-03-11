const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server');

const app = express();
const blockchain = new Blockchain();
const p2pServer = new P2pServer(blockchain);

const config = require('./config');

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json());

app
  .get('/blocks', (req, res) => {
  res.json(blockchain.chain);
})
  .post('/mine', (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added ! ${block.toString()}`);

    res.redirect('/blocks');
  });

app.listen(config.port, () => console.log(`API server listening on port ${config.port}`));
p2pServer.listen();
