const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const dayjs = require('dayjs');

class Nutrition extends Model {}

Nutrition.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		food_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		meal_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		calorie_count_per_serving: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		calorie_count_servings: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
			  model: 'user',
			  key: 'id',
			},
		},
		meal_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
			get() {
			  const date = this.getDataValue('meal_date');
			  return dayjs(date).format('MM/DD/YYYY');
			}
		  
		},
	},
	{
		sequelize,
		modelName: "nutrition",
		timestamps: true,
		underscored: true,
	}

);

module.exports = Nutrition;