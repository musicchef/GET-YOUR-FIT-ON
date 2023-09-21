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
        calorie_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        carb_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        protein_content: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fat_content: { 
            type: DataTypes.INTEGER, 
            allowNull: false
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