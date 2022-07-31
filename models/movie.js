const mongoose = require('mongoose');
const regex = require('../utils/regex');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) { return regex.test(url); },
      message: 'Ошибка в url',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(url) { return regex.test(url); },
      message: 'Ошибка в url',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) { return regex.test(url); },
      message: 'Ошибка в url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
