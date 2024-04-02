const { response } = require("express");
const { Movie, UserMovie } = require("../models");
const { Op } = require("sequelize");

module.exports = class MovieController {
  static async getMovies(req, res, next) {
    try {
      //   console.log(req.user, "<<<< ini di cuisines"); // testing
      //   let cuisines = await Cuisine.findAll();
      //   //   console.log(cuisines);
      //   res.status(200).json(cuisines);

      console.log(req.query);
      const { filter, sort, page } = req.query;
      const paramsQuerySql = {};

      //   filtering
      if (filter) {
        paramsQuerySql.where = {
          categoryId: filter,
        };
      }

      //   sorting
      if (sort) {
        const ordering = sort[0] === "-" ? "DESC" : "ASC";
        const columnName = ordering === "DESC" ? sort.slice(1) : sort;
        paramsQuerySql.order = [[columnName, ordering]];
      }

      let limit = 10;

      let pageNumber = 1;

      if (page) {
        if (page.size) {
          if (page.size) {
            limit = +page.size;
            paramsQuerySql.limit = limit;
          }
          if (page.number) {
            pageNumber = +page.number;
            paramsQuerySql.offset = limit * (pageNumber - 1);
          }
        }
      }

      const { count, rows } = await Movie.findAndCountAll(paramsQuerySql);

      console.log(rows);

      res.json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      //   res.status(500).json({
      //     message: "Internal server error",
      //   });
      next(error);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const movie = await Movie.findByPk(req.params.id);

      if (!movie) throw { name: "Not Found" };
      res.status(200).json({ message: "Success get one data", movie });
    } catch (error) {
      //   if (error.name === "Not Found") {
      //     res.status(404).json({ message: "Cuisine Not Found" });
      //   } else {
      //     console.log(error);
      //     res.status(500).json({ message: "Internal server error" });
      //   }
      next(error);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const movie = await Movie.findByPk(req.params.id);

      if (!movie) throw { name: "Not Found" };
      res.status(200).json({ message: "Success get one data", movie });
    } catch (error) {
      //   if (error.name === "Not Found") {
      //     res.status(404).json({ message: "Cuisine Not Found" });
      //   } else {
      //     console.log(error);
      //     res.status(500).json({ message: "Internal server error" });
      //   }
      next(error);
    }
  }
  static async postMoviesLike(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.user);
      let { movieId } = req.body;
      let movie = await UserMovie.create({
        movieId,
        userId: req.user.id,
      });

      res.status(201).json(movie);
    } catch (error) {
      //   console.log(error.name);
      //   if (error.name === "SequelizeValidationError") {
      //     let message = error.errors[0].message;
      //     console.log(message, "ini msg error dari sequelize");

      //     res.status(400).json({
      //       message: message,
      //     });
      //   } else {
      //     res.status(500).json({
      //       message: "Internal server error",
      //     });
      //   }
      next(error);
    }
  }

  static async deleteMoviesLike(req, res, next) {
    try {
      let id = req.params.id;

      //   Validasi utk saat delete data id, agar data id yg sdh di delete message-nya tdk success lg dan akan di throw ke status 404.
      let movie = await UserMovie.findByPk(id);

      if (!movie) {
        throw { name: "Not Found" };
      }
      // await Cuisine.destroy({
      //   where: { id },
      // }); atau pake yg di bawah
      await movie.destroy();

      res.status(200).json({
        message: "Movie has been successfully delete",
      });
    } catch (error) {
      //   console.log(error);
      //   if (error.name === "Not Found") {
      //     res.status(404).json({
      //       message: "Cuisine is not found",
      //     });
      //   } else {
      //     res.status(500).json({
      //       message: "Internal server error",
      //     });
      //   }
      next(error);
    }
  }
  static async updateMovies(req, res, next) {
    try {
      console.log(req.body);
      let id = req.params.id;
      let {
        poster_path,
        title,
        release_date,
        genre_ids,
        original_language,
        overview,
        video,
        movieId,
      } = req.body;
      let movie = await Movie.findByPk(id);
      if (!movie) {
        throw { name: "Not Found" };
      }
      await movie.update({
        poster_path,
        title,
        release_date,
        genre_ids,
        original_language,
        overview,
        video,
        movieId,
      });

      res.status(200).json({
        message: "Movie has been successfully update",
        cuisine,
      });
    } catch (error) {
      //   console.log(error.name);
      //   if (error.name === "SequelizeValidationError") {
      //     let message = error.errors[0].message;
      //     console.log(message, "ini msg error dari sequelize");

      //     res.status(400).json({
      //       message: message,
      //     });
      //   } else if (error.name === "Not Found") {
      //     res.status(404).json({
      //       message: "Cuisine is not found",
      //     });
      //   } else {
      //     res.status(500).json({
      //       message: "Internal server error",
      //     });
      //   }
      next(error);
    }
  }

  static async postNewMovies(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.user);
      let {
        poster_path,
        title,
        release_date,
        genre_ids,
        original_language,
        overview,
        video,
        movieId,
      } = req.body;
      let movie = await Movie.create({
        poster_path,
        title,
        release_date,
        genre_ids,
        original_language,
        overview,
        video,
        movieId,
        // userId: req.user.id,
      });

      res.status(201).json({
        status: "success",
        data: movie,
      });
    } catch (error) {
      //   console.log(error.name);
      //   if (error.name === "SequelizeValidationError") {
      //     let message = error.errors[0].message;
      //     console.log(message, "ini msg error dari sequelize");

      //     res.status(400).json({
      //       message: message,
      //     });
      //   } else {
      //     res.status(500).json({
      //       message: "Internal server error",
      //     });
      //   }
      next(error);
    }
  }
};

/*
npx sequelize-cli model:generate --name Movie --attributes poster_path:string,title:string,release_date:integer,genre_ids:string,original_language:string,overview:string,video:boolean
*/
