const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({


});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;