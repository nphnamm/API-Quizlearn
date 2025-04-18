"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.UUID, // Change from INTEGER to UUID
        defaultValue: Sequelize.UUIDV4, // Auto-generate UUID
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1, // Default to "active" status (status ID 1)
      },
      experiencePoints : {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default to "active" status (status ID 1)
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      expToNextLevel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100, // Level 1 cần 100 exp để lên Level 2
      },
      coins: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      currentStreak: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      longestStreak: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      lastStreakDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: "874f51b7-87f6-426d-bc0f-01344748a52a",
        references: {
          model: "Roles",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};