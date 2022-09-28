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
      // if == -1, indicates the user is the host and therefore may not select a racer
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participant_message: {
      // references a user's message for a particular race
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      // references the user model's id
      references: {
        model: "user",
        key: "username",
      },
    },
    race_id: {
      type: DataTypes.STRING,
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