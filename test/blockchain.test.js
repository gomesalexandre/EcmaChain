const Blockchain = require('../blockchain');
const Block = require('../block');

describe('Blockchain', () => {
  let blockchain;
  let blockchain2;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it('Starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });
  it('Adds a new block to the chain', () => {
    blockchain.addBlock('foo');

    expect(blockchain.chain[blockchain.chain.length -1].data).toEqual('foo');
  });
  it('Validates a valid chain', () => {
    blockchain2.addBlock('foo');

    expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
  });
});
