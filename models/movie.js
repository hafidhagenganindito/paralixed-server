"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.UserMovie, { foreignKey: "movieId" });
    }
  }
  Movie.init(
    {
      poster_path: DataTypes.STRING,
      title: DataTypes.STRING,
      release_date: DataTypes.DATE,
      genre_ids: DataTypes.STRING,
      original_language: DataTypes.STRING,
      overview: DataTypes.TEXT,
      video: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
