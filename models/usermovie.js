"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserMovie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserMovie.belongsTo(models.User, { foreignKey: "userId" });
      UserMovie.belongsTo(models.Movie, { foreignKey: "movieId" });
    }
  }
  UserMovie.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User", // Tabel yang direferensikan
          key: "id", // Kolom yang direferensikan di tabel User
        },
      },
      movieId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Movie", // Tabel yang direferensikan
          key: "id", // Kolom yang direferensikan di tabel Movie
        },
      },
    },
    {
      sequelize,
      modelName: "UserMovie",
    }
  );
  return UserMovie;
};
