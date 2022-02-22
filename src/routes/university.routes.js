const express = require('express');
const { query, param } = require('express-validator');
const universityController = require('../controllers/university.controller');

const UniversityRoutes = express.Router();

UniversityRoutes.get('/', [
  query('page').isInt().optional(),
  query('country').isString().optional(),
  universityController.index]);

UniversityRoutes.get('/:id', [
  param('id').isString(),
  universityController.show]);

module.exports = UniversityRoutes;
