//what we require in
const sequelize = require('../config/connection');
const { User, Exercise, Friend, Nutrition } = require('../models');

const userData = require('./userData.json');
const exerciseData = require('./exerciseData.json');
const nutritionData = require('./nutritionData.json');
const friendsData = require('./friendsData.json');

//creating the seeds
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

   await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const exercise of exerciseData) {
    await Exercise.create({
      ...exercise,
    });
  }
  for (const nutrtion of nutritionData) {
    await Nutrition.create({
      ...nutrtion,
    });
  }
  for (const friend of friendsData) {
    await Friend.create({
        ...friend,
    });
  }
  process.exit(0);
};

seedDatabase();
