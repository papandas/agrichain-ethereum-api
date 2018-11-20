# agrichain-ethereum-api

| Endpoint                  | Method | Parameters |
| ---                       | ---    | --- |
| /api/getBalance           | POST   | from_account:String ethereum account hash. |
| /api/createNewAccount     | GET    | from_account:String
privateKey:String\n to_account:String\n ethValue:String\n |
| /api/transferEth          | POST   | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/verifyContract       | POST   | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/signup               | POST   | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/signin               | POST   | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/distributors         | GET    | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/producers            | GET    | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/consumers            | GET    | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/assets/new           | POST   | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/assets/all           | POST   | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/orders/all           | GET    | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/orders/new           | POST   | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/orders/update        | POST   | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/purchase/distributor | POST   | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
| /api/purchase/consumer    | POST   | from_account:String\n privateKey:String\n to_account:String\n ethValue:String\n |
