/**
 * <p> 工作量计算结果 </p>
 */
export class PowResult {
  private nonce: number;
  private hash: string;

  public getNonce() {
    return this.nonce;
  }

  public getHash() {
    return this.hash;
  }

  public constructor(nonce: number, hash: string) {
    this.nonce = nonce;
    this.hash = hash;
  }
  
}