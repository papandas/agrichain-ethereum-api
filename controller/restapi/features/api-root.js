

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


exports.postAssets = function(req,res,next){
    const { from_account, privateKey, harvest, commodity, acres, _yield, basic, Insurance, costs, sellprice} = req.body; 

    web3.eth.getBalance(from_account)
    .then((reply)=>{
        var ethBal = web3.utils.fromWei(reply, 'ether');
        
        if(ethBal > 0){

            const contract = new web3.eth.Contract(ABI, ContractAddress);

            web3.eth.getTransactionCount(from_account)
            .then((txCount)=>{

                const data = contract.methods.PostAssets(harvest, commodity, acres, _yield, basic, Insurance, costs, parseInt(_yield), sellprice).encodeABI();
                //value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
                    
                const txObject = {
                    nonce: web3.utils.toHex(txCount),
                    to: ContractAddress,
                    gasLimit: web3.utils.toHex(6000000),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('600', 'gwei')),
                    data: data
                }
 
                const tx = new Tx(txObject);
                const signKey = Buffer.from(privateKey.substring(2), 'hex');
                tx.sign(signKey);

                const serializedTransaction = tx.serialize();
                const raw = '0x' + serializedTransaction.toString('hex');
            
                web3.eth.sendSignedTransaction(raw)
                .then((txHash)=>{
                    res.send({'result':'success','txHash':txHash})
                })
                .catch((error)=>{
                    console.log(error);
                    res.send({'result':'failed','error': 'Error send Signed Transaction: ' + error.message})
                })
            })
            .catch((error)=>{
                res.send({'result':'failed','error':'Error get Transaction Count: ' + error.message})
            })
            

        }else{
            res.send({'result':'failed', 'error':'No ether balance.'});
        }
    })
    .catch(()=>{
        console.log(error);
        res.send({'result':'failed','error': 'Get Balance Failed: ' + error.message})
    })

    
}

exports.SignIn = function(req, res) {
    res.send("Hello World!");
}

exports.createNew = function(req, res, next){
    var account = web3.eth.accounts.create();
    res.send({'result':'success','account':account})
}

exports.freebalance = function(req, res, next){
    web3.eth.getBalance(adminAcc, (err, res) => {
        if(err){
            res.send({'result':'failed','error':err.message})
            return;
        }
        var ethBal = web3.utils.fromWei(res, 'ether');
        if(ethBal.toNumber() > 0){
            web3.eth.getTransactionCount(adminAcc, (err, txCount) => {
                if(err){
                    res.send({'result':'failed','error':err.message})
                    return;
                }
                const txObject = {
                    nonce: web3.utils.toHex(txCount),
                    to: res.body.account,
                    value: web3.utils.toHex(web3.utils.toWei(ethAmt, 'ether')),
                    gasLimit: web3.utils.toHex(21000),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
                }

                const tx = new Tx(txObject);
                const signKey = Buffer.from(privateKey, 'hex');
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

exports.SignUp = function(req, res, next){
    var account = web3.eth.accounts.create();
    console.log("Address: " + account.address);
    console.log("Private Key: " + account.privateKey);
    let profile = {};
    profile.client = account.address;
    profile.type = res.body.type;
    profile.fullname = res.body.fullname;
    profile.email = res.body.email;
    profile.cell = res.body.cell;
    profile.password = account.privateKey
    res.send({'result':'success','data':profile})
}