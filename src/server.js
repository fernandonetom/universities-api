const { connect } = require('./database/mongodb');

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connect()
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

  console.log(`Server started on http://localhost:${port}`);
});
