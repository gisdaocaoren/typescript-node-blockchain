import { Block } from "./block";
import { Util } from "./util";
import { PowResult } from "./powResult";
const crypto = require('crypto');
export class ProofOfWork {
  public static TARGET_BITS: number = 26;  //难度目标位,数字越大，越简单

  private block: Block;
  private target: number; // 目标难度值

  public getBlock(): Block {
    return this.block;
  }

  public constructor(block: Block, target: number) {
    this.block = block;
    this.target = target;
  }

  public static newProofOfWork(block: Block): ProofOfWork {
    /**
     * 14 的二进制是 00111000
     * 00001110 向左位移2位 00111000 = 56
      var temp;
      temp = 14 << 2;
      alert(temp);
     * 弹出【56】
    */
    let targetValue = 1 << (256-this.TARGET_BITS);
    return new ProofOfWork(block, targetValue);
  }

  /**
   * 运行工作量证明，开始挖矿，找到小于难度目标值的Hash
   */
  public run() {
    let nonce: number = 0;
    debugger;
    console.log('开始挖矿', JSON.stringify(this.getBlock().getData()));
    let time = new Date();
    let hash = '';
    while(true) {
      hash = this.prepareData(nonce);
      let targetHexStr = this.target.toString(2) // this.target: 64, 二进制为1000000
      targetHexStr = targetHexStr.substr(1);// 取后面6个0
      if (hash.substr(0, 6) === targetHexStr) { // 实际运行用这行代码
      // if (hash.substr(0, 6) === '000000') { // 简单起见，节省时间，直接这样写死
        console.log('耗时', (((new Date()).getTime() - time.getTime()) / 1000) + '秒' );
        break;
      } else {
        nonce ++;
      }
    }
    return new PowResult(nonce, hash);
  }

  public validate() {
    let hash = this.prepareData(this.getBlock().getNonce());
    let targetHexStr = this.target.toString(2)  
    targetHexStr = targetHexStr.substr(1); 
    return hash.substr(0, 6) === targetHexStr;
  }

  private prepareData(nonce) {
    let hash = crypto.createHash('sha256');
    let prevHash: string = '';
    if (this.getBlock().getPreviousHash()) {
      prevHash += this.getBlock().getPreviousHash();
    }
    let block1 = this.getBlock();
    let blockData1 = '';
    if (block1.getData()) {
      blockData1 = (typeof block1.getData() === 'string') ? block1.getData() : JSON.stringify(block1.getData()); 
    }

    let data1 = prevHash + blockData1 + block1.getTimestamp() + ProofOfWork.TARGET_BITS + nonce;
    let dataBuffer = Buffer.from(JSON.stringify(data1));
    let hashValue = hash.update(dataBuffer).digest('hex');    
    return hashValue;
  }
}