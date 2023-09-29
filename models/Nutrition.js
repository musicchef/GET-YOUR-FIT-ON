//what we require in
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//model is extended
class Nutrition extends Model {}

//sections for the table
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
			type: DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: DataTypes.NOW, 
		},
	},
	{
		sequelize,
		modelName: "nutrition",
		freezeTableName: true,
		timestamps: true,
		underscored: true,
	}

);

module.exports = Nutrition;