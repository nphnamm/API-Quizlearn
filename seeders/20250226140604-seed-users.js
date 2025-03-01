"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(), // UUID tự động tạo
        username: "admin",
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        phoneNumber: "0123456789",
        password: await bcrypt.hash("password123", 10), // Mã hóa mật khẩu
        avatar: null,
        roleId:"3dd54a71-c0f5-4142-a1ff-ec9b08e91dbb",
        statusId: 1, // Active
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phoneNumber: "0987654321",
        password: await bcrypt.hash("password123", 10),
        avatar: null,
        roleId:"874f51b7-87f6-426d-bc0f-01344748a52a",
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
