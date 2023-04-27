const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

const {
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();

router.use(express.json());

app.use((request, response, next) => {
  request.user = {
    _id: '644a8291ec66de4e89f9cb62',
  };
  next();
});

app.use(router);

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    await app.listen(PORT);
  } catch (err) {
    console.log(err);
  }
}

start()
  .then(() => console.log(`App has been successfully started!\n${MONGO_URL}\nPort: ${PORT}`));
