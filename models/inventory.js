const mongoose = require('mongoose');

const invSchema = new mongoose.Schema(
    {
      name: { type: String, required: true}, 
      desc: { type: String, required: true}, 
      price: { type: Number, required: true },
      inventory: { type: Number, required: true},
      imgLink: { type: String, required: true}, 
    },
  );

const TheInventory = mongoose.model('items', invSchema);

module.exports = TheInventory;