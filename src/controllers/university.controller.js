/* eslint-disable camelcase */
const { validationResult } = require('express-validator');
const University = require('../models/university');
const { createError } = require('../utils/createErrors');

class UniversityController {
  async index(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(422, errors.array()));
    }

    try {
      const limit = 20;
      const { page = 1, country } = req.query;

      const query = {};

      if (country) query.country = { $regex: new RegExp(country, 'i') };

      const cursor = University
        .collection
        .find(query, {
          projection: {
            name: 1,
            country: 1,
            'state-province': 1,
          },
        });

      const totalOfItems = await cursor.count();
      const totalOfPages = Math.ceil(totalOfItems / limit);

      const data = await cursor.skip((limit * (page - 1)))
        .limit(limit).toArray();

      return res.json({
        query: {
          page: parseInt(page, 10),
          totalOfItems,
          totalOfPages,
        },
        data,
      });
    } catch (error) {
      return next(createError(500));
    }
  }

  async show(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(422, errors.array()));
    }

    try {
      const { id } = req.params;

      const university = await University.findById(id);

      if (!university) return next(createError(404));

      return res.json(university);
    } catch (error) {
      return next(createError(500));
    }
  }

  async create(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(422, errors.array()));
    }

    try {
      const {
        domains, country, web_pages, name, alpha_two_code,
      } = req.body;
      const state = req.body['state-province'];

      const filter = {
        country: { $regex: new RegExp(country, 'i') },
        name: { $regex: new RegExp(name, 'i') },
      };

      if (state) filter['state-province'] = { $regex: new RegExp(state, 'i') };

      const university = await University.findOne(filter);

      if (university) return next(createError(400, 'University already exists'));

      const created = await University.create({
        domains,
        country,
        web_pages,
        name,
        alpha_two_code,
        'state-province': state,
      });

      return res.status(201).json(created);
    } catch (error) {
      return next(createError(500));
    }
  }

  async update(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(422, errors.array()));
    }

    try {
      const { id } = req.params;

      const {
        domains, country, web_pages, name, alpha_two_code,
      } = req.body;
      const state = req.body['state-province'];

      const filter = {
        country: { $regex: new RegExp(country, 'i') },
        name: { $regex: new RegExp(name, 'i') },
      };

      if (state) filter['state-province'] = { $regex: new RegExp(state, 'i') };

      const university = await University.findOne(filter);

      if (university && university.id !== id) return next(createError(400, 'University already exists'));

      const updated = await University.findByIdAndUpdate(id, {
        domains,
        country,
        web_pages,
        name,
        alpha_two_code,
        'state-province': state,
      }, {
        new: true,
      });

      return res.status(201).json(updated);
    } catch (error) {
      return next(createError(500));
    }
  }

  async destroy(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(422, errors.array()));
    }

    try {
      const { id } = req.params;

      const university = await University.findByIdAndRemove(id);

      if (!university) return next(createError(404));

      return res.sendStatus(204);
    } catch (error) {
      return next(createError(500));
    }
  }
}

const universityController = new UniversityController();

module.exports = universityController;
