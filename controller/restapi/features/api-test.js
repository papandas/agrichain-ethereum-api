

/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const infuraURL = 'https://rinkeby.infura.io/v3/14470f78e2cc459d877bb629fdc5703a'
const web3 = new Web3(infuraURL);
const ContractAddress = '0xb8Ebea87fF6cB183Bea5c5C75a5923EeDb261d2e'; // '0xC0E7752546fa0b8D09a2c78304c75F67dbDbb1e3'; // 
const { ABI } = require('../../ABI');



const ethAmt = '0.05';
const adminAcc = '0xaE0ba611603Ec52104c9aB52deDA584806BBEc14';
const privateKey = '687d850ccdb847b79610a2def6cdb132a0e61457f67b9c9d8b9bcf9d5b9e507b';



exports.postAssets = function(req,res,next){
    const { from_account, privateKey, harvest, commodity, acres, _yield, basic, Insurance, costs, sellprice} = req.body; 

    web3.eth.getBalance(from_account, (err, reply) => {
        if(err){
            res.send({'result':'failed', 'message':'Could not get account balance.', 'error':err.message})
            return;
        }
        var ethBal = web3.utils.fromWei(reply, 'ether');
        
        if(ethBal > 0){

            const contract = new web3.eth.Contract(ABI, ContractAddress);

            web3.eth.getTransactionCount(from_account, (err, txCount) => {
                if(err){
                    res.send({'result':'failed','error':err.message})
                    return;
                }

                const data = contract.methods.PostAssets(harvest, commodity, acres, _yield, basic, Insurance, costs, parseInt(_yield), sellprice).encodeABI();

                
                const txObject = {
                    nonce: web3.utils.toHex(txCount),
                    to: ContractAddress,
                    gasLimit: web3.utils.toHex(6000000),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                    data: data
                }

                const tx = new Tx(txObject);
                const signKey = Buffer.from(privateKey.substring(2), 'hex');
                tx.sign(signKey);

                const serializedTransaction = tx.serialize();
                const raw = '0x' + serializedTransaction.toString('hex');
            
                web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                    if(err){
                        res.send({'result':'failed','error':err.message})
                        return;
                    }
                    
                    res.send({'result':'success','txHash':txHash})
                    
                })

            })

        }else{
            res.send({'result':'failed', 'message':'Insufficient ether balance.'});
        }
    });
}


exports.signin = function(req,res,next){
    const { from_account } = req.body; 

    const contract = new web3.eth.Contract(ABI, ContractAddress);

    const data = contract.methods.participants(from_account).call((err, result)=>{
        if(err){
            console.log(err);
            res.send({'result':'failed','error':err.message});
            return;
        }
        res.send({'result':'success','details':result});
    })
       
}

exports.signup = function(req,res,next){
    const { from_account, privateKey, email, fullname, cell, password, type } = req.body; 

    web3.eth.getBalance(from_account, (err, reply) => {
        if(err){
            res.send({'result':'failed', 'message':'Could not get account balance.', 'error':err.message})
            return;
        }
        var ethBal = web3.utils.fromWei(reply, 'ether');
        
        if(ethBal > 0){

            const contract = new web3.eth.Contract(ABI, ContractAddress);

            web3.eth.getTransactionCount(from_account, (err, txCount) => {
                if(err){
                    res.send({'result':'failed','error':err.message})
                    return;
                }

                const data = contract.methods.signup(email, fullname, cell, password, type).encodeABI();
                
                const txObject = {
                    nonce: web3.utils.toHex(txCount),
                    to: ContractAddress,
                    gasLimit: web3.utils.toHex(500000),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                    data: data
                }

                const tx = new Tx(txObject);
                const signKey = Buffer.from(privateKey.substring(2), 'hex');
                tx.sign(signKey);

                const serializedTransaction = tx.serialize();
                const raw = '0x' + serializedTransaction.toString('hex');
            
                web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                    if(err){
                        res.send({'result':'failed','error':err.message})
                        return;
                    }
                    
                    res.send({'result':'success','txHash':txHash})
                    
                })

            })

        }else{
            res.send({'result':'failed', 'message':'Insufficient ether balance.'});
        }
    });
}


exports.verifyContract = function(req, res){
    const contract = new web3.eth.Contract(ABI, ContractAddress);
    if(contract.options.address === req.body.contractAddress){
        res.send({'result':'success'});
    }else{
        res.send({'result':'failed'});
    }
}

exports.transferEth = function(req, res) {
    const { from_account, privateKey, to_account, ethValue } = req.body;

    web3.eth.getBalance(from_account, (err, reply) => {
        if(err){
            res.send({'result':'failed','error':err.message})
            return;
        }
        var ethBal = web3.utils.fromWei(reply, 'ether');
        
        if(ethBal > 0){
            web3.eth.getTransactionCount(from_account, (err, txCount) => {
                if(err){
                    res.send({'result':'failed','error':err.message})
                    return;
                }
                
                const txObject = {
                    nonce: web3.utils.toHex(txCount),
                    to: to_account,
                    value: web3.utils.toHex(web3.utils.toWei(ethValue, 'ether')),
                    gasLimit: web3.utils.toHex(21000),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
                }
                
                const tx = new Tx(txObject);
                const signKey = Buffer.from(privateKey.substring(2), 'hex');
                tx.sign(signKey);

                const serializedTransaction = tx.serialize();
                const raw = '0x' + serializedTransaction.toString('hex');
            
                web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                    if(err){
                        res.send({'result':'failed','error':err.message})
                        return;
                    }
                    
                    res.send({'result':'success','txHash':txHash})
                    
                })
            })
        }
    })
}



exports.getBalance = function(req, res) {
    const { from_account } = req.body; 

    web3.eth.getBalance(from_account, (err, reply) => {
        if(err){
            res.send({'result':'failed','error':err.message});
            return;
        }
        const ethBal = web3.utils.fromWei(reply, 'ether');
        res.send({'result':'success','balance':ethBal, 'unit':'ether'});
    })
}


exports.createNewAccount = function(req, res, next){
    var account = web3.eth.accounts.create();
    res.send({'result':'success','account':account})
}

