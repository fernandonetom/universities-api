const { mongoose } = require('../database/mongodb');

const UniversitySchema = new mongoose.Schema({
  'state-province': {
    type: String,
    required: false,
  },
  domains: {
    type: [String],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  web_pages: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  alpha_two_code: {
    type: String,
    required: true,
  },
});

const University = mongoose.model('University', UniversitySchema);

module.exports = University;
