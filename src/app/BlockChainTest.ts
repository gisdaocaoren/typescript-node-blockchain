import { Blockchain } from "../class/blockchain";
import { Block } from "../class/block";
import { ProofOfWork } from "../class/proofOfWork";

let blockchain  = new Blockchain();
blockchain.addBlock( 'send 1 btc to a');
blockchain.addBlock( 'send 1 btc to a');

console.log(blockchain.getBlockList().length);
blockchain.getBlockList().forEach((block: Block) => {
  console.log('Pre.hash:' + block.getPreviousHash());
  console.log('Hash: ' + block.getHash());
  console.log('Data: ' + block.getData());
  console.log('Nonce: ' + block.getNonce());

  let pow:ProofOfWork = ProofOfWork.newProofOfWork(block);
  console.log('Pow valid:' + pow.validate());
  console.log('-----------------');

});