import { Block } from "./block";
import { Util } from "./util";
import { PowResult } from "./powResult";
export class ProofOfWork {
  public static TARGET_BITS: number = 20;  //难度目标位

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
    console.log('开始挖矿', JSON.stringify(this.getBlock().getData()));
    let time = new Date();
    let hash = '';
    while(true) {
      hash = this.prepareData(nonce).toString();
      if (this.target + '' === hash.toString()) {
        console.log('耗时', ((new Date()).getTime() - time.getTime() / 1000) + '秒' );
        break;
      } else {
        nonce ++;
      }
    }
    return new PowResult(nonce, hash);
  }

  public validate() {
    let hash = this.prepareData(this.getBlock().getNonce());
    return hash + '' === this.target + '';
  }

  private prepareData(nonce) {
    let prevHashBytes: any[] = [];
    if (this.getBlock().getPreviousHash()) {
      prevHashBytes = Util.stringToBytes(this.getBlock().getPreviousHash());
    }
    return prevHashBytes.concat(Util.stringToBytes(JSON.stringify(this.getBlock())), Util.stringToBytes(ProofOfWork.TARGET_BITS + ''), Util.stringToBytes(nonce + ''));
  }
}