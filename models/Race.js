const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const randomize = require('../utils/randomize');

class Race extends Model {}

Race.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    race_id: {
      type: DataType.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gold: {
      type: DataTypes.INTEGER,
    },
    silver: {
      type: DataTypes.INTEGER,
    },
    bronze: {
      type: DataTypes.INTEGER,
    }
  },
  {
    hooks: {
      beforeCreate: async (newRace) => {
        newRace.race_id = await randomize();
        newRace.gold = -1;
        newRace.silver = -1;
        newRace.bronze = -1;
        return newRace;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'race',
  }
);

module.exports = Race;
