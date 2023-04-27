const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');

const {
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();

app.use(bodyParser.json());

app.use((request, response, next) => {
  request.user = {
    _id: '644a8291ec66de4e89f9cb62',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

async function start() {
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

start()
  .then(() => console.log('App has been successfully started'));
