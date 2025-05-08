'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Images", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publicId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
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

    // Add index for faster queries
    await queryInterface.addIndex("Images", ["userId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Images");
  }
}; 