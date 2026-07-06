const mongoose = require('mongoose');

const categories = [
  {
   " _id": new mongoose.Types.ObjectId('6a4ab2bc7ca17c886e0530ab'),
    "name": "Electronics",
    "description": "electricity-powered stuff",
    "slug": "electronics",
    "lastModified": new Date("2026-07-05T20:50:54.272Z")
  },
  {
    "_id": new mongoose.Types.ObjectId('6a4ab3267ca17c886e0530ae'),
    "name": "Stuffy stuff",
    "description": "random",
    "slug": "stuffy-stuff",
    "lastModified": new Date("2026-07-05T20:51:45.565Z")
  },
  {
    "_id": new mongoose.Types.ObjectId('6a4ac4b27ca17c886e0530bb'),
    "name": "Clothes",
    "description": "Things you wear",
    "slug": "clothes",
    "lastModified": new Date("2026-07-05T20:55:50.097Z")
  }
];

module.exports = categories;