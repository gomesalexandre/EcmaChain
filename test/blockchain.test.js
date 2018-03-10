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
  it('Invalidates chain with a corrupt genesi block', () => {
    blockchain2.chain[0] = 'This is now corrupt';

    expect(blockchain.isValidChain(blockchain2)).toBe(false);
  });
  it('Invalidates a corrupt chain', () => {
    blockchain2.addBlock('bar');
    blockchain2.chain[1].data = 'not bar';

    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });
  it('Replaces chain with a new, valid chain', () => {
    blockchain2.addBlock('Satoshi');

    blockchain.replaceChain(blockchain2.chain);

    expect(blockchain.chain).toEqual(blockchain2.chain);
  });
});
