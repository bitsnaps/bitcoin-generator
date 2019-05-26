//send BTC back to mwCwTceJvYV27KXBc3NJZys6CjsgsoeHmf

console.log('\n');

var bitcore = require('bitcore-lib');

var privateKeyWIF = 'cQGewBdAXmjvbKNTBkDndtYxJdy5yTc3RGGtMMei1MEQq344Zd7a';

var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);

var address = privateKey.toAddress();

var address2 = 'mwCwTceJvYV27KXBc3NJZys6CjsgsoeHmf';

var Insight = require('bitcore-explorers').Insight;
var insight = new Insight('testnet');


insight.getUnspentUtxos(address, function(err, utxos){
  if (err){
    // Handle errros
    console.error('An error has occurred while attempting to process this transaction');
  } else {
      
    var tx = bitcore.Transaction();
    tx.from(utxos); //utxos is array of unspent outputs
    //important, otherwise you'll get an error: "Fee is too small"
    tx.to(address2, 329870000); // (3.29940000 + 70000 fee) BTC
    tx.change(address);
    tx.fee(10000); //bitcoin will include fee by default, but its better to be safe
    tx.sign(privateKey); //otherwise error: "Some inputs have not been fully signed"
    // console.log('transaction:');
    // console.log(tx.toObject());
    tx.serialize();
    console.log('serialized output:');
    console.log(tx.serialize());//broadcast this value to: https://test-insight.bitpay.com/tx/send
    

insight.broadcast(tx, function(err, returnedTxId){
  if (err){
    // handle errors...
    console.error('An error has occurred while broadcasting this transaction');
  } else {
    // mark the transaction as broadcasted
    console.log('successful broadcast: ' + returnedTxId); //output:
    //check at:
    //https://www.blocktrail.com/tBTC/address/my9Vu7otfnLJE4QwwqYzfBC2DzvrRPr2an/transactions
  }
});

    
  }
});    