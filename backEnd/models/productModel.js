const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: false },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: false },
  countInStock: { type: Number, default: 0, required: false },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: false },
  numReviews: { type: Number, default: 0, required: false },
});

const ProductModel = mongoose.model("Product", productSchema);

exports.ProductModel = ProductModel;