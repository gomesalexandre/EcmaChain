const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const blockchain = new Blockchain();

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

  .get('/blocks', (req, res) => {
  res.json(blockchain.chain);
})
  .post('/mine', (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added ! ${block.toString()}`);

    res.redirect('/blocks');
  })

  .listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
