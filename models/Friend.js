const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Friend extends Model {}

Friend.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // This is the user making the friend request
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user', 
        key: 'id',
      },
    },
    // This is the user that receives the friend request
    friend_id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING, // pending or accepted
      allowNull: false,
      defaultValue: 'pending', // unsure if we should have a default value but can discuss in next meeting
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'friend',
    timestamps: false, 
    underscored: true,
  }
);

module.exports = Friend;
