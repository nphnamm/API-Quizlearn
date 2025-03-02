"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserSessions', [
      {
        id: uuidv4(), // UUID tự động tạo
        userId: '67a0c050-ab8b-4432-bfc4-e295e23d7c8e', // Mock User UUID
        setId: '4e4ca51c-3c3c-45a2-9e98-676e4a30c62a', // Mock Set UUID
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // UUID tự động tạo
        userId: '67a0c050-ab8b-4432-bfc4-e295e23d7c8e',
        setId: '10c4fdce-5ff0-4ed9-9ce3-b0b5f59f368d',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserSessions', null, {});

  }
};
