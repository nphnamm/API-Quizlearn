"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("UserProgresses", [
      {
        id: uuidv4(), // UUID tự động tạo
        sessionId: "1ed44120-399e-4190-9c00-147bf0bd52b4", // Mock UserSession UUID
        cardId: "0b732c20-8de1-4d8e-a664-c1444c822b6b", // Mock Card UUID
        isCorrect: true,
        answeredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // UUID tự động tạo
        sessionId: "1ed44120-399e-4190-9c00-147bf0bd52b4",
        cardId: "0e4aa554-16f3-4f8e-b7c7-24d6f7b93c02",
        isCorrect: false,
        answeredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // UUID tự động tạo
        sessionId: "1ed44120-399e-4190-9c00-147bf0bd52b4",
        cardId: "19bc510b-1735-4d7b-aec4-c56468b053bf",
        isCorrect: false,
        answeredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // UUID tự động tạo
        sessionId: "1ed44120-399e-4190-9c00-147bf0bd52b4",
        cardId: "3166e0c1-1ed3-4b9c-8906-b82b5e59b41c",
        isCorrect: false,
        answeredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // UUID tự động tạo
        sessionId: "1ed44120-399e-4190-9c00-147bf0bd52b4",
        cardId: "32b9f51f-6724-4504-b0e3-8d92c60e8299",
        isCorrect: false,
        answeredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // UUID tự động tạo
        sessionId: "1ed44120-399e-4190-9c00-147bf0bd52b4",
        cardId: "48b7897b-cb3c-4d32-9806-dc39718c72a2",
        isCorrect: false,
        answeredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // UUID tự động tạo
        sessionId: "1ed44120-399e-4190-9c00-147bf0bd52b4",
        cardId: "60a256b0-6b70-454e-984a-38fb521ebb2b",
        isCorrect: false,
        answeredAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserProgresses", null, {});
  },
};
