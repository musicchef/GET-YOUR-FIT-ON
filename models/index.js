const Exercise = require('./Exercise');
const User = require('./User');
const Friend = require('./Friend');


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



  module.exports = { User, Exercise, Nutrition };