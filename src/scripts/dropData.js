const { connect, close } = require('../database/mongodb');
const University = require('../models/university');

async function drop() {
  await connect();
  console.log('MongoDB connected');

  await University.deleteMany();
  console.log('Database was dropped with success!');

  close();
  console.log('MongoDB disconnected');
}

drop();
