"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Sets", "userId", {
      type: Sequelize.UUID,
      allowNull: true, // Temporarily nullable for existing data
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Sets", "userId");
  },
};