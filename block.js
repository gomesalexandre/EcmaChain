const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timeStamp, lastHash, hash, data) {
    this.timeStamp = timeStamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
  // Overriding Object.prototype.toString()
  toString() {
    return `Block -
      Timestamp : ${this.timeStamp}
      Last Hash : ${this.lastHash.substring(0, 10)}
      Hash      : ${this.hash.substring(0, 10)}
      Data      :  ${this.data}
    `;
  }
  static genesis() {
    return new this('Genesis time', '----', 'Very first hash of our blockchain', []);
  }
  static mineBlock(lastBlock, data) {
    const timeStamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = this.hash(timeStamp, lastBlock, data);

    return new this(timeStamp, lastHash, hash, data);
  }
  static hash(timeStamp, lastHash, data) {
    return SHA256(`${timeStamp}${lastHash}${data}`).toString();
  }
};

module.exports = Block;
