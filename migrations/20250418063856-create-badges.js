'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Badges", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Auto-generate UUID
        primaryKey: true,
      },
      badgeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "BadgeCategories",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      iconUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      requirement_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      requirement_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Badges");

  }
};
