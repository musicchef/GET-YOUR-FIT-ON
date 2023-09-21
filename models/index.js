const Exercise = require('./Exercise');
const User = require('./User');
const Friend = require('./Friend');
const Nutrition = require('./Nutrition');


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

  User.hasMany(Nutrition, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

  Nutrition.belongsTo(User, {
    foreignKey: 'user_id'
  })



  module.exports = { User, Exercise, Nutrition };