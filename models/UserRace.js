const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserRace extends Model {}

UserRace.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    racer_choice: {
      // references a user's selection for a particular race
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participant_message: {
      // references a user's message for a particular race
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      // references the user model's id
      references: {
        model: "user",
        key: "id",
      },
    },
    race_id: {
      type: DataTypes.INTEGER,
      // references the race model's id
      references: {
        model: "race",
        key: "race_id",
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_race',
  }
);

module.exports = UserRace;