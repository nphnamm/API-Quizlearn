"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Folders", [
      {
        id: uuidv4(), // Unique UUID for folder
        name: "Math",
        description: "Math-related flashcards",
        userId: "24739db2-bc10-41c5-a4cc-5eb43a351c7d", // Replace with a valid user UUID
        isPublic: true,
        statusId: 1, // Active
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "English",
        description: "English Vocabulary",
        userId: "67a0c050-ab8b-4432-bfc4-e295e23d7c8e", // Replace with a valid user UUID
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
