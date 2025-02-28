"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Folders", [
      {
        id: uuidv4(), // Unique UUID for folder
        name: "Math",
        description: "Math-related flashcards",
        userId: "46840857-148a-4296-b13d-0782bc08e73f", // Replace with a valid user UUID
        isPublic: true,
        statusId: 1, // Active
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Science",
        description: "Science and Physics topics",
        userId: "50efdd78-36fa-43c6-bfee-ba3aef8a53bc", // Replace with a valid user UUID
        isPublic: false,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Folders", null, {});
  },
};
