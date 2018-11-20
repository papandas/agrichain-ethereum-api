# agrichain-ethereum-api

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
