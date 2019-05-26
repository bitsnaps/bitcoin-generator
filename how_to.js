//***** create a bitcoin address ******** //

/*
var bitcore = require('bitcore-lib');

var rand_buffer = bitcore.crypto.Random.getRandomBuffer(32);

var rand_number = bitcore.crypto.BN.fromBuffer(rand_buffer);

console.log('Your private key: ' + rand_number.toString());

var address = new bitcore.PrivateKey(rand_number).toAddress();

//test bitcoin network, a real wallet won't send to this network
//var address = new bitcore.PrivateKey(rand_number).toAddress('testnet');

console.log('Here is your address: ' + address);

//****** Send & Receive Bitcoin ******* //
//we're going to use a testnet from https://testnet.manu.backend.hamburg/faucet
//here we're going to create a btc address and save the private key to a file
//write to console:
var bitcore = require('bitcore-lib');
//toWIF stands for Wallet Info Format for extra information and error checking
var privateKeyWIF = bitcore.PrivateKey('testnet').toWIF();  //save the generated key somewhere

//generate a btc address
var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);//cQGewBdAXmjvbKNTBkDndtYxJdy5yTc3RGGtMMei1MEQq344Zd7a
var address = privateKey.toAddress();

console.log('address:');
console.log(address);

//copy the address to 

//you need a minimum to make a transaction, this site may give you an estimation:
//https://live.blockcypher.com/

//install bitcore-explorers to connect to bitcoin network
//npm install bitcore-explorers --save
//you may need to delete "bitcore-lib" folder from 
node_modules/bitcore-explorers/node_modules otherwise you'll get the error:
//Error: More than one instance of bitcore-lib found. Please make sure to require 
// bitcore-lib and check that submodules do not also include their own bitcore-lib dependency.

var value = new Buffer('this is a way to generate an address from a string-risky-not random-guessable!!!');
var hash = bitcore.crypto.Hash.sha256(value);
var bn = bitcore.crypto.BN.fromBuffer(hash);
var address2 = new bitcore.PrivateKey(bn, 'testnet').toAddress();
console.log('address2:');
console.log(address2);

var Insight = require('bitcore-explorers').Insight;
var insight = new Insight('testnet');

insight.getUnspentUtxos(address, function(err, utxos){
  if (err){
    // Handle errros
  } else {
    // use the UTXOs to create a transaction
    console.log(utxos);
    var tx = bitcore.Transaction();
    tx.from(utxos);
    tx.to(address2, 10000); // .0001 BTC
    tx.change(address);
    tx.fee(50000);
    tx.sign(privateKey);
    console.log('transaction:');
    console.log(tx.toObject());
    tx.serialize();
    console.log('serialized output:');
    console.log(tx.serialize());
  }
});

//you can run the transaction using:
//bitcored
//but this requires over 100 Gb and several days to setup!

*/