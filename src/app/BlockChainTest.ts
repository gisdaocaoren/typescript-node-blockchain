import { Blockchain } from "../class/blockchain";
import { Block } from "../class/block";

let blockchain  = new Blockchain();
blockchain.addBlock( 'send 1 btc to a');
blockchain.addBlock( 'send 1 btc to a');
blockchain.addBlock( 'send 3 btc to c');

console.log(blockchain.getBlockList().length);
blockchain.getBlockList().forEach((block: Block) => {
  console.log('Pre.hash:' + block.getPreviousHash());
  console.log('Hash: ' + block.getHash());
  console.log('Data: ' + block.getData());
  console.log('-----------------');

});