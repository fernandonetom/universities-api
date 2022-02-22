const express = require('express');
const { query } = require('express-validator');
const universityController = require('../controllers/university.controller');

const UniversityRoutes = express.Router();

UniversityRoutes.get('/', [
  query('page').isInt().optional(),
  query('country').isString().optional(),
  universityController.index]);

module.exports = UniversityRoutes;
