const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger.json');
const UniversityRoutes = require('./routes/university.routes');
const { createError } = require('./utils/createErrors');
const handleErrors = require('./utils/handleErrors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/universities', UniversityRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(handleErrors);

module.exports = app;
