const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

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
        calorie_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'nutrition',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Nutrition;