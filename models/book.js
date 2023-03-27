'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  newYorkBestseller: { type: Boolean, required: true },

});


const Book = mongoose.model('book', BookSchema);

module.exports = Book;
