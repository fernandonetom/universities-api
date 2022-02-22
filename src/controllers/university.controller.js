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

      const data = await cursor.skip(20)
        .limit(10).toArray();

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
}

const universityController = new UniversityController();

module.exports = universityController;
