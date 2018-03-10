const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const newBlock = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(newBlock);

    return newBlock;
  }
  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
    // Starting from 1 as we can't use lastBlock.hash on the 0 block
    for (let i = 1; i < chain.length ; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
        if (block.lastHash !== lastBlock.hash || block.hash != Block.blockHash(block)) {
          console.log('Block hash is', block.hash);
          console.log('Block check is', Block.blockHash(block));
          return false}
    };

    return true;
  }
}

module.exports = Blockchain;
