
const crypto = require('crypto');
import { ProofOfWork } from "./proofOfWork";

export class Block{
  private hash: string;
  private previousHash: string;
  private data: any;
  private timestamp: number;   
   /**
  * 工作量证明计数器
  */
  private nonce: number;

  public constructor(metadata?: any) {
    const defaultBlock = {
      hash: '',
      previousHash: '',
      data: null,
      timestamp: new Date().getTime()
    };
    metadata = metadata ||{};
    Object.assign(this, defaultBlock, metadata);
  }

  public getHash() {
    return this.hash;
  }
  public setHash(hash) {
    return this.hash;
  }
  public getPreviousHash() {
    return this.previousHash;
  }
  public getData() {
    return this.data;
  }

  public setNonce(nonce) {
    this.nonce = nonce;
  }

  public getNonce() {
    return this.nonce;
  }


  /**
   * 创建新区块
   * @param previousHash 
   * @param data 
   */
  public static newBlock(previousHash: string, data: any) {
    let block = new Block({previousHash: previousHash, data: data});
    let pow = ProofOfWork.newProofOfWork(block);
    let powResult = pow.run();
    block.setHash(powResult.getHash());
    block.setNonce(powResult.getNonce())
    return block;
  }

  /**
   * 创世区块
   */
  public static newGenesisBlock() {
    let genesisBlock = Block.newBlock('',"Genesis Block");
    genesisBlock.setHash('');
    return genesisBlock;
  }

  // /**
  //  * set Hash
  //  */
  // private setHash() {
  //   let hash = crypto.createHash('sha256');
  //   let dataBuffer = Buffer.from(JSON.stringify(this));
  //   let hashValue = hash.update(dataBuffer).digest('hex');   // 可任意多次调用update()，不过这里不需要:
  //   // Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥
  //   // const secret = '';
  //   // const hash = crypto.createHmac('sha256', secret).update(this).digest('hex');
  //   this.hash = hashValue;
  // }
}