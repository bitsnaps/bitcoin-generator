console.log('\n');

var bitcore = require('bitcore-lib');

var privateKeyWIF = 'cQGewBdAXmjvbKNTBkDndtYxJdy5yTc3RGGtMMei1MEQq344Zd7a';

var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);

var address = privateKey.toAddress();

// console.log('address:');//my9Vu7otfnLJE4QwwqYzfBC2DzvrRPr2an
// console.log(address);

//current fee estimation: 0.00073 BTC/KB


var value = new Buffer('this is a way to generate an address from a string-risky-not random-guessable!!!');
var hash = bitcore.crypto.Hash.sha256(value);
var bn = bitcore.crypto.BN.fromBuffer(hash);
var address2 = new bitcore.PrivateKey(bn, 'testnet').toAddress();
// console.log('address2:');
// console.log(address2);

var Insight = require('bitcore-explorers').Insight;
var insight = new Insight('testnet');

insight.getUnspentUtxos(address, function(err, utxos){
  if (err){
    // Handle errros
    console.error('An error has occurred while attempting to process this transaction');
  } else {
    // use the UTXOs to create a transaction
    console.log(utxos); //output:
    //[ <UnspentOutput: f2f8b6ec335c4a1b68d37fc0ee22ab141b532c006285ce14a9bd9ae5ffc5563c:0, satoshis: 330000000, address: my9Vu7otfnLJE4QwwqYzfBC2DzvrRPr2an> ]
    //transaction can have multiple inputs/outputs so you need to have an index with transaction
    var tx = bitcore.Transaction();
    tx.from(utxos); //utxos is array of unspent outputs
    //important, otherwise you'll get an error: "Fee is too small"
    tx.to(address2, 10000); // .0001 BTC
    tx.change(address);
    tx.fee(50000); //bitcoin will include fee by default, but its better to be safe
    tx.sign(privateKey); //otherwise error: "Some inputs have not been fully signed"
    // console.log('transaction:');
    // console.log(tx.toObject());
    tx.serialize();
    console.log('serialized output:');
    console.log(tx.serialize());//broadcast this value to: https://test-insight.bitpay.com/tx/send
    
//script printing
// var sprintIn = bitcore.Script(tx.toObject().inputs[0].script);
// console.log('input script string:');
// console.log(scriptIn.toString());
// var scriptOut = bitcore.Script(tx.toObject().output[0].script);
// console.log('output script string:');
// console.log(scriptOut.toString());

    
    // tx.addData(); //add extra data
    
insight.broadcast(tx, function(err, returnedTxId){
  if (err){
    // handle errors...
    console.error('An error has occurred while broadcasting this transaction');
  } else {
    // mark the transaction as broadcasted
    console.log('successful broadcast: ' + returnedTxId); //output:
    //successful broadcast: 15f8fc9b847088d85b9949d1c1780ace04d8c1ee1d5c56499c465d16e865a2fb
    
    //details transaction at: http://tbtc.blockr.io/address/info/my9Vu7otfnLJE4QwwqYzfBC2DzvrRPr2an
    // Hash:my9Vu7otfnLJE4QwwqYzfBC2DzvrRPr2an
    // Balance: 3.29940000 TBTC
    // Total received: 3.30000000 TBTC
    // Transactions: 2
    // Unconfirmed: 3.29940000 TBTC
    
    //after broadcast at: https://test-insight.bitpay.com/tx/send
    // Hash: my9Vu7otfnLJE4QwwqYzfBC2DzvrRPr2an
    // Balance: 3.29940000 TBTC
    // Total received: 3.30000000 TBTC
    // Transactions: 2
    // Unconfirmed: 3.29880000 TBTC  <------ CHANGED!
    

    //transaction details at: http://tbtc.blockr.io/tx/info/15f8fc9b847088d85b9949d1c1780ace04d8c1ee1d5c56499c465d16e865a2fb
    // Hash: 15f8fc9b847088d85b9949d1c1780ace04d8c1ee1d5c56499c465d16e865a2fb
    // Time: 2017-04-11 11:22:12
    // Sum of incoming txs: 3.30000000 TBTC
    // Sum of outgoing txs: 3.29950000 TBTC
    // Traded: 0.00010000 TBTC
    // Fee: 0.00050000
    // Confirmations: 0
    // Coin days destroyed: 0 
    // Included in block: Unconfirmed transaction!    

  }
});

    
  }
});