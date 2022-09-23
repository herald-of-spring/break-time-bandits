const User = require('./User');
const Race = require('./Race');
const UserRace = require('./UserRace');

Race.belongsToMany(User, {
  through: UserRace,
  foreignKey: "race_id"
});

User.belongsToMany(Race, {
  through: UserRace,
  foreignKey: "user_id"
});

module.exports = { User, Race };
