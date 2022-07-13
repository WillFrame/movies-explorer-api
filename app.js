const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

mongoose.connect('mongodb://localhost:27017/diplomdb');

const { PORT = 3000 } = process.env;
const app = express();

const ALLOWED_LIST = [
  'http://mesto.willframe.nomoredomains.xyz',
  'https://mesto.willframe.nomoredomains.xyz',
  'http://localhost:3000',
];

const corsOptions = {
  origin: function func(origin, callback) {
    if (ALLOWED_LIST.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Страницы с таким адресом не существует'));
});

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log('work!');
});
