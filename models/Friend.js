const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Friend extends Model {}

Friend.init(
  {
    id: {
      type: DataTypes.UUID, 
      // when doing research it was recommended to use uuid's for friendship records, can change to INTEGER for consistency with other models later if preferred
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    // This is the user making the friend request
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', 
        key: 'id',
      },
    },
    // This is the user that receives the friend request
    friend_id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'User',
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
    modelName: 'Friend',
    timestamps: false, 
    underscored: true,
  }
);

module.exports = Friend;
