"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: "f49186a8-c5df-4a1b-8b08-7968a1b3d372", // UUID tự động tạo
        username: "admin",
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        phoneNumber: "0123456789",
        password: await bcrypt.hash("password123", 10), // Mã hóa mật khẩu
        avatar: null,
        provider: null,
        roleId: "3dd54a71-c0f5-4142-a1ff-ec9b08e91dbb",
        experiencePoints:50,
        level:1,
        expToNextLevel:100,
        coins:200,
        currentStreak:5,
        longestStreak:100,
        lastStreakDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        statusId: 1, // Active
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "82d7fb57-9190-43d2-b501-606222e37228",
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phoneNumber: "0987654321",
        password: await bcrypt.hash("password123", 10),
        avatar: null,
        provider: null,
        roleId: "874f51b7-87f6-426d-bc0f-01344748a52a",
        statusId: 1,
        experiencePoints:50,
        level:1,
        expToNextLevel:100,
        coins:200,
        currentStreak:14,
        longestStreak:14,
        lastStreakDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
