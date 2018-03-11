const Block = require ('../blockchain/block.js');

describe('Block', () => {
  let data, lastBlock, block;

  beforeEach(() => {
    data = 'bar';
    lastBlock = Block.genesis();
    block = Block.mine(lastBlock, data);
  });

  it('Sets the data in the block', () => {
    expect(block.data).toEqual(data)
  });
  it('Sets the `lastHash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });
});
