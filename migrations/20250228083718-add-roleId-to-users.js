"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "roleId", {
      type: Sequelize.UUID,
      allowNull: true,
      defaultValue: "c96943bf-e17f-401c-b554-faed0ff8e802",
      references: {
        model: "Roles",
        key: "id",
      },
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "roleId");
  },
};
