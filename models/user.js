"use strict";
const { Model } = require("sequelize");

const { hashPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserMovie, { foreignKey: "movieId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          // unique ini adalah Constrain
          msg: "Email already use",
        }, // Pesan utk ketika login agar, arang yg login berikutnya ga bisa pake email yg sama dan hrs unique
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Must be in email format ",
          }, // validasi utk email wajib berformat email, dan ini mirip2 fn
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      premium: {
        type: DataTypes.BOOLEAN,
      },
      // allowNull: false,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  // Hooks
  User.beforeCreate((user) => {
    user.password = hashPass(user.password);
    user.premium = false; // premium
  });
  return User;
};
