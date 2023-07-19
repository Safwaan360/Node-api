const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the product name'],
  },
  quantity: {
    type: Number,
    default: 0,
    required: [true, 'Please enter the product quantity'],
  },
  price: {
    type: Number,
    default: 0,
    required: [true, 'Please enter the product price'],
  },
  image: String,
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
