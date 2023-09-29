//what we require in
const Exercise = require('./Exercise');
const User = require('./User');
const Friend = require('./Friend');
const Nutrition = require('./Nutrition');

//user has many exercises and connects them via foreign key
  User.hasMany(Exercise, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Exercise.belongsTo(User, {
    foreignKey: 'user_id'
  });

  User.belongsToMany(User, {
    as: 'friends', 
    through: Friend, 
  });

  //user has many nutritions and connects them via foreign key
  User.hasMany(Nutrition, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

  Nutrition.belongsTo(User, {
    foreignKey: 'user_id'
  })



  module.exports = { User, Exercise, Nutrition, Friend };