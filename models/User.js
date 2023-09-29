//what we require in
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//class extends model
class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
        // "this" is a user instance
    }
}

//parts of the table
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true, // We can change if we want names to be required
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // Ensure usernames are unique
      unique: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // Ensure emails are unique
      unique: true,
      // Validate email format
      validate: {
        isEmail: true, 
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], 
      },
    },

    // multer is an npm package we can use
    profile_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
   
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true, 
    underscored: true,
    modelName: 'user',
    //hashing the password
    hooks: {
        beforeCreate: async (newUser) => {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            return newUser;
        },
        beforeUpdate: async (updatedUser) => {
            updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
            return updatedUser;
        },
    },
  }
);

module.exports = User;
