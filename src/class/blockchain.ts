import { Block } from "./block";

export class Blockchain {
  private blockList: Block[];

  public constructor(blockList?: Block[]) {
    this.blockList = blockList || [];
    if (!this.blockList.length) {
      this.blockList.push(Block.newGenesisBlock());
    }
  }

  public getBlockList() {
    return this.blockList;
  }

  public addBlock(data: any) {
    let previousBlock: Block = this.blockList[this.blockList.length - 1];
    let newBlock = Block.newBlock(previousBlock.getHash(), data)
    this.blockList.push(newBlock);
  }

  
}