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


var express = require('express');
var router = express.Router();
var format = require('date-format');

var root = require('./features/api-root');
var test = require('./features/api-test');


module.exports = router;
var count = 0;
/**
 * This is a request tracking function which logs to the terminal window each request coming in to the web serve and 
 * increments a counter to allow the requests to be sequenced.
 * @param {express.req} req - the inbound request object from the client
 * @param {express.res} res - the outbound response object for communicating back to client
 * @param {express.next} next - an express service to enable post processing prior to responding to the client
 * 
 * @function
 */
router.use(function(req, res, next) {
  count++;
  console.log('['+count+'] at: '+format.asString('hh:mm:ss.SSS', new Date())+' Url is: ' + req.url);
  next(); // make sure we go to the next routes and don't stop here
});


router.post('/api/getBalance*', test.getBalance);
router.get('/api/createNewAccount*', test.createNewAccount );
router.post('/api/transferEth*', test.transferEth);
router.post('/api/verifyContract*', test.verifyContract);
router.get('/api/distributors*', test.AllDistributors);
router.get('/api/producers*', test.getAllProducers);
router.get('/api/consumers*', test.getAllConsumers);
router.post('/api/signup*', test.signup);
router.post('/api/signin*', test.signin);

router.post('/api/assets/new*', test.postAssets); 
router.post('/api/assets/update*', test.updateAsset);
router.post('/api/assets/all*', test.getAssetsList);

router.get('/api/orders/all', test.GetAllOrders);
router.post('/api/orders/new',test.CreateOrder);
router.post('/api/orders/update',test.UpdateOrder);

router.post('/api/purchase/distributor*', test.DistributorPurchase);
router.post('/api/purchase/consumer*', test.ConsumerPurchase);



