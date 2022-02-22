const { default: axios } = require('axios');
const { connect, close } = require('../database/mongodb');
const University = require('../models/university');

const countries = [
  'argentina',
  'brasil',
  'chile',
  'colombia',
  'paraguai',
  'peru',
  'suriname',
  'uruguay',
];

async function populate() {
  await connect();
  console.log('MongoDB connected');

  await Promise.all(
    countries.map(async (country) => {
      const { data } = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);

      await Promise.all(data.map(async (university) => {
        await University.create({
          'state-province': university['state-province'],
          domains: university.domains,
          country: university.country,
          web_pages: university.web_pages,
          name: university.name,
          alpha_two_code: university.alpha_two_code,
        });
      }));

      console.log(`${country} - success`);
    }),
  );

  await close();
  console.log('MongoDB disconnected');
}

populate();
