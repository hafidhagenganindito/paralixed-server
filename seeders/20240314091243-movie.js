"use strict";
const fs = require("fs");
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const { data } = await axios({
      method: "GET",

      url: "https://api.themoviedb.org/3/discover/movie?api_key=94c52060d31ad11d2a1fae79ebd02e3e",
    });
    console.log(data.results);

    // const movies = data.results.map((movie) => {
    //   movie.createdAt = new Date();
    //   movie.updatedAt = new Date();
    //   return movie;
    // });
    await queryInterface.bulkInsert(
      "Movies",
      data.results.map((movie) => ({
        // Mapping data dari API ke format yang sesuai dengan tabel
        // Contoh:
        poster_path: movie.poster_path,
        title: movie.title,
        release_date: movie.release_date,
        genre_ids: movie.genre_ids,
        original_language: movie.original_language,
        overview: movie.overview,
        video: movie.video,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),

      console.log(data.results)
      // {}
    );
    // await queryInterface.bulkInsert("Movies", movies);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
