# Agrichain - RESTful API Service

Ethereum Smart Contract deployed on Rinkeby Test Network [0xb8Ebea87fF6cB183Bea5c5C75a5923EeDb261d2e](https://rinkeby.etherscan.io/address/0xb8Ebea87fF6cB183Bea5c5C75a5923EeDb261d2e).

Front-end with Metamask [Ethereum POC](https://papandas.github.io/Agrichain-Ethereum-POC/).

API Service hosted on [Heroku](https://agrichain-ethereum-api.herokuapp.com/).



| Endpoint                  | Method | Parameters |
| ---                       | ---    | --- |
| /api/getBalance           | POST   | from_account:String ethereum account hash. |
| /api/createNewAccount     | GET    | \-- |
| /api/transferEth          | POST   | from_account:String, privateKey:String, to_account:String, ethValue:String |
| /api/verifyContract       | POST   | contractAddress:String |
| /api/signup               | POST   | from_account:String, privateKey:String, email:String, fullname:String, cell:String, password:String, type:String |
| /api/signin               | POST   | from_account:String |
| /api/distributors         | GET    | \-- |
| /api/producers            | GET    | \-- |
| /api/consumers            | GET    | \-- |
| /api/assets/new           | POST   | from_account:String, privateKey:String, harvest:String, commodity:String, acres:String, _yield:String, basic:String, Insurance:String, costs:String, sellprice:String |
| /api/assets/all           | POST   | from_account:String |
| /api/orders/all           | GET    | \-- |
| /api/orders/new           | POST   | from_account:String, privateKey:String, to_address:String, assetId:String, quantity:String, price:String |
| /api/orders/update        | POST   | from_account:String, privateKey:String, orderId:String, state:String, replyState:String |
| /api/purchase/distributor | POST   | from_account:String, privateKey:String, to_address:String, orderId:String |
| /api/purchase/consumer    | POST   | from_account:String, privateKey:String, to_address:String, assetId:String, quantity:String |
