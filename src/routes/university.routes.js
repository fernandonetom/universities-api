const express = require('express');
const { query, param, check } = require('express-validator');
const universityController = require('../controllers/university.controller');

const UniversityRoutes = express.Router();

UniversityRoutes.get('/', [
  query('page').isInt().optional(),
  query('country').isString().optional(),
  universityController.index]);

UniversityRoutes.get('/:id', [
  param('id').isString(),
  universityController.show]);

UniversityRoutes.delete('/:id', [
  param('id').isString(),
  universityController.destroy]);

UniversityRoutes.put('/:id', [
  param('id').isString(),
  check('state-province').isString().optional(),
  check('domains').isArray().optional(),
  check('domains.*').isString().optional(),
  check('country').isString().optional(),
  check('web_pages').isArray().optional(),
  check('web_pages.*').isString().optional(),
  check('name').isString().optional(),
  check('alpha_two_code').isString().optional(),
  universityController.update]);

UniversityRoutes.post('/', [
  check('state-province').isString().optional(),
  check('domains').isArray().optional(),
  check('domains.*').isString().optional(),
  check('country').isString(),
  check('web_pages').isArray().optional(),
  check('web_pages.*').isString().optional(),
  check('name').isString(),
  check('alpha_two_code').isString(),
  universityController.create]);

module.exports = UniversityRoutes;
