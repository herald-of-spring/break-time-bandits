const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Race extends Model {}

Race.init(
  {
    race_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // duration: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    host: {
      type: DataTypes.STRING,
      allowNull: false
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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'race',
  }
);

module.exports = Race;
