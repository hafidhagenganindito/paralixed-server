"use strict";
const fs = require("fs");
const { Interface } = require("readline");
const { hashPass } = require("../helpers/bcrypt");
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
    // await queryInterface.bulkInsert("UserMovies", userMovies);

    await queryInterface.bulkInsert("Users", [
      {
        email: "user1@gmail.com",
        password: hashPass("user1"),
        premium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "messi@gmail.com",
        password: hashPass("messi"),
        premium: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
    // await queryInterface.bulkDelete("UserMovies", null, {});
  },
};
