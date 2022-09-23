const sequelize = require('../config/connection');
const { User, Race } = require('../models');

const userRaceData = require('./userRaceData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userRaceData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
