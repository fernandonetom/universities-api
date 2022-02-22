require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
  return mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

async function close() {
  return mongoose
    .connection.close();
}

module.exports = { connect, close, mongoose };
