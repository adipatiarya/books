const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  review: {
    type: String,
    default: ''
  },
  pages: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: '',
    min: 1,
    max: 5
  },
  price: {
    type: String,
    default: ''
  },
  ownerId: {
    type: String,
    required: true
  }
}, { timeStamps: true });

var book = mongoose.model('Book', BookSchema);

module.exports = book;
