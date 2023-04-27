const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/cards', cardRouter);

async function start() {
  app.use((req, res, next) => {
    req.user = {
      _id: '644a686aa919fd03bc9eb197',
    };
    next();
  });
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`App connected to ${MONGO_URL}`);
  } catch (err) {
    console.log(err);
  }
  try {
    await app.listen(PORT);
    console.log(`App is listening on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

start().then(() => console.log('App has been successfully started'));
