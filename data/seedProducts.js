const mongoose = require('mongoose');

const electronicsId = new mongoose.Types.ObjectId('6a4ab2bc7ca17c886e0530ab');
const stuffId = new mongoose.Types.ObjectId('6a4ab3267ca17c886e0530ae');
const clothesId = new mongoose.Types.ObjectId('6a4ac4b27ca17c886e0530bb');

/*
next steps will probably be:

* Convert the remaining `$oid` values to `new mongoose.Types.ObjectId(...)`.
* Convert the `$date` values to `new Date(...)` (or remove them if your schema uses timestamps and you don't care about preserving them).
* Run `npm run seed` and check that the summary logs the expected number of categories and products.

*/

const products = [{
  "_id": new mongoose.Types.ObjectId('6a40c49f53006c0ae329e732'),
  "name": "Smartphone",
  "description": "high quality",
  "price": 699,
  "category":
    new mongoose.Types.ObjectId('6a4ab2bc7ca17c886e0530ab'),
  "inStock": true,
  "createdAt": new Date('2026-06-28T06:52:15.665Z'),
  "updatedAt": new Date('2026-06-28T06:52:15.665Z'),
  "__v": 0,
  "stock": 45,
  "images": [
    "https://www.sportskeeda.com/gaming-tech/5-best-flagship-smartphones-2024"
  ]
},
{
  "_id": new mongoose.Types.ObjectId('6a493c3d817c6ca54965505d'),
  "name": "potato",
  "description": "Quality depends",
  "price": 100000,
  "category":
    new mongoose.Types.ObjectId('6a4ab3267ca17c886e0530ae'),
  "inStock": true,
  "createdAt": new Date('2026-07-04T17:00:45.497Z'),
  "updatedAt": new Date('2026-07-04T17:04:33.244Z'),
  "__v": 0,
  "stock": 1,
  "images": [
    "https://www.alamy.com/stock-photo-a-fresh-raw-yukon-gold-potato-146778180.html"
  ]
},
{
  "_id": new mongoose.Types.ObjectId('6a4ac7628cacb94daf2c46c1'),
  "name": "Dress",
  "description": "95% cotton, 5% licra",
  "price": 540,
  "category":
    new mongoose.Types.ObjectId('6a4ac4b27ca17c886e0530bb'),
  "inStock": true,
  "stock": 20,
  "images": [],
  "createdAt": new Date('2026-07-05T21:06:42.738Z'),
  "updatedAt": new Date('2026-07-05T21:06:42.738Z'),
  "__v": 0
},
{
  "_id": new mongoose.Types.ObjectId('6a4ac9cb8cacb94daf2c46c2'),
  "name": "Beans",
  "description": "Soy, black and green beans",
  "price": 778899,
  "category":
    new mongoose.Types.ObjectId('6a4ab3267ca17c886e0530ae'),
  "inStock": true,
  "stock": 4,
  "images": [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhealthy-food-near-me.com%2Fwp-content%2Fuploads%2F2022%2F09%2Fbeans-varieties-and-types-photo-with-description-8.jpg&f=1&nofb=1&ipt=2d8e2a36fe218fe8dfb11ffa6a104f848d04636a91708d8866d8222cb03795e0"
  ],
  "createdAt": new Date('2026-07-05T21:16:59.128Z'),
  "updatedAt": new Date('2026-07-05T21:16:59.128Z'),
  "__v": 0
},
{
  "_id": new mongoose.Types.ObjectId('6a4acc9e8cacb94daf2c46c3'),
  "name": "Skirt",
  "description": "100% cotton, has white lacing on the bottom",
  "price": 182,
  "category":
    new mongoose.Types.ObjectId('6a4ac4b27ca17c886e0530bb'),
  "inStock": false,
  "stock": 0,
  "images": [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fa.1stdibscdn.com%2F1900s-edwardian-white-tiered-cotton-and-lace-maxi-skirt-for-sale%2Fv_550%2Fv_229707421716900805012%2Fv_22970742_1716900805428_bg_processed.jpg&f=1&nofb=1&ipt=f3ef311db00f178403102e418fb4b2c97290c2b5e111ac9872c4fee655228b8d"
  ],
  "createdAt": new Date('2026-07-05T21:29:02.707Z'),
  "updatedAt": new Date('2026-07-05T21:29:02.707Z'),
  "__v": 0
},
{
  "_id": new mongoose.Types.ObjectId('6a4acd808cacb94daf2c46c4'),
  "name": "Wacom Tablet",
  "description": "comes with free stylus",
  "price": 10023,
  "category":
    new mongoose.Types.ObjectId('6a4ab2bc7ca17c886e0530ab'),
  "inStock": false,
  "stock": 0,
  "images": [],
  "createdAt": new Date('2026-07-05T21:32:48.035Z'),
  "updatedAt": new Date('2026-07-05T21:32:48.035Z'),
  "__v": 0
}]

module.exports = products;