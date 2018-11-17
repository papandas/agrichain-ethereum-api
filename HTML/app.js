var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const web3 = new Web3('https://rinkeby.infura.io/v3/14470f78e2cc459d877bb629fdc5703a');

const account1 = '0xaE0ba611603Ec52104c9aB52deDA584806BBEc14';
const account2 = '0x74768cF88BC8a4cd033d9136fbF5720Fa7d0ba21';

//5d0f394b455a8f8cb29ca2d77a34c6ef981d8ca4b8474fb6ebc4f201215cc3a8
const account1privateKey = '687d850ccdb847b79610a2def6cdb132a0e61457f67b9c9d8b9bcf9d5b9e507b';
const account2privateKey = 'c25af6e6bf6790558aad8beda7056fc63bfd7a4c1f68b5bf31ca7daaf307aba8';

const privateKey1 = Buffer.from(account1privateKey, 'hex');
const privateKey2 = Buffer.from(account2privateKey, 'hex');

var account = web3.eth.accounts.create();
console.log("Account2 Private Key2: " + account.address);
console.log("Account2 Private Key2: " + account.privateKey);

/*
web3.eth.getBalance(account1, (err, res) => {
    console.log('before:Account 1 Balance:', web3.utils.fromWei(res, 'ether'));

    web3.eth.getBalance(account.address, (err, res) => {
        console.log('before:Account 2 Balance:', web3.utils.fromWei(res, 'ether'));
        
        web3.eth.getTransactionCount(account1, (err, txCount) => {
    
            const txObject = {
                nonce: web3.utils.toHex(txCount),
                to: account.address,
                value: web3.utils.toHex(web3.utils.toWei('0.05', 'ether')),
                gasLimit: web3.utils.toHex(21000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
            }
        
            console.log('Tx Object:', txObject);
        
            const tx = new Tx(txObject);
            //console.log(tx);
            tx.sign(privateKey1);
        
            const serializedTransaction = tx.serialize();
            const raw = '0x' + serializedTransaction.toString('hex');
        
            web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                console.log('txHash:', txHash);
                web3.eth.getBalance(account1, (err, res) => {
                    console.log('after:Account 1 Balance:', web3.utils.fromWei(res, 'ether'));
                    web3.eth.getBalance(account2, (err, res) => {
                        console.log('after:Account 2 Balance:', web3.utils.fromWei(res, 'ether'));
                    })
                })
            })
        })
    })
})

*/




