const sequelize = require('../config/connection');
const { User, Race, UserRace } = require('../models');

const userRaceData = require('./userRaceData.json');
const userData = require('./userData.json');
const raceData = require('./raceData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Race.bulkCreate(raceData, {
    individualHooks: true,
    returning: true,
  });

  await UserRace.bulkCreate(userRaceData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
