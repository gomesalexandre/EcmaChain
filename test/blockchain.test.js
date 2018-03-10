const Blockchain = require('../blockchain');
const Block = require('../block');

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('Starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });
  it('Adds a new block to the chain', () => {
    const data = 'foo';
    blockchain.addBlock(data);
    expect(blockchain.chain[blockchain.chain.length -1].data).toEqual(data);
  });
});
