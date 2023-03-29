'use strict';



// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// *** REQUIRE IN OUR MONGOOSE LIBRARY ***
const mongoose = require('mongoose');

// **** BRING IN MY CAT MODEL ****
const Book = require('./models/book.js');

const app = express();

// middleware
app.use(cors());

app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));

// **** CONNECT MONGODB USING MONGOOSE ***
// *** PER THE MONGOOSE DOCS - PLUG AND PLAY CODE ****

mongoose.connect(process.env.DB_URL);

// *** HELPFUL FOR TROUBLESHOOTING IN TERMINAL WHY YOU CAN'T CONNECT TO YOUR MONGODB ***
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// ENDPOINTS
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

// *** ENDPOINT TO RETREIVE ALL BOOKS FROM MY DATABASE ***

app.get('/book', getBooks);

async function getBooks(request, response, next){
  // TODO: Get all cats from db
  try {
    let allBooks = await Book.find({}); // Model.find({}) - retreives all docs from database

    response.status(200).send(allBooks);

  } catch (error) {
    next(error);
  }
}

// **** ENDPOINT TO DELETE A BOOK FROM MY DATABASE *****

app.delete('/book/:bookID', deleteBook);

async function deleteBook(request,response,next){
  try {
    let id = request.params.bookID;

    await Book.findByIdAndDelete(id);

    response.status(200).send('Book Deleted!');
  } catch (error) {
    next(error);
  }
}

// **** ENDPOINT TO UPDATE BOOK *****

app.put('/book/:bookID', updateBook);

async function updateBook(request, response, next){
  try {

    let id = request.params.bookID;
    let data = request.body;

    const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true});

    response.status(200).send(updatedBook);

  } catch (error) {
    next(error);
  }
}

// **** ENDPOINT TO ADD A BOOK *****

app.post('/book', postBook);

async function postBook(request, response,next){
  try {
    let createdBook = await Book.create(request.body);

    response.status(201).send(createdBook);
  } catch (error) {
    next(error);
  }
}



app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

