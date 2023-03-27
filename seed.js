'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {
  

  await Book.create({
    Title: 'The 48 Laws of Power',
    Description: 'The 48 laws of power is the ultimate guide to gaining and defending against ultimate control',
    newYorkBestseller: true
  });

  console.log('The 48 Laws of Power was created!');

  await Book.create({
    Title: 'A Promised Land',
    Description: 'Published on November 17, 2020, it is the first of a planned two-volume series. Remaining focused on his political career, the presidential memoir documents Obamas life from his early years through to the events surrounding the killing of Osama bin Laden in May 2011.',
    newYorkBestseller: true
  });

  console.log('A Promise Land was added');

  await Book.create({
    Title: 'Hurricanes',
    Description: 'The highly anticipated memoir from hip-hop icon Rick Ross chronicles his coming of age amid Miamis crack epidemic, his star-studded controversies and his unstoppable rise to fame. Rick Ross is an indomitable presence in the music industry, but few people know his full story.',
    newYorkBestseller: true
  });

  console.log('Hurricanes was added');

  mongoose.disconnect();
}

seed();
