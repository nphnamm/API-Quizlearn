'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BadgeCategories", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Auto-generate UUID
        primaryKey: true,
      },
      categoryName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      displayOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

    // Seed data
    await queryInterface.bulkInsert("BadgeCategories", [
      {
        id: "9a1629de-8544-4fcf-b48b-a660d833bac4", categoryName: "Creator", displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "d0e45803-b628-4b63-ae4d-40fc32d995fd", categoryName: "Learning", displayOrder: 2, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "1a302555-9179-4302-8520-2b18174b9971", categoryName: "Social", displayOrder: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "7f417c99-6553-4bdc-a345-753dd801a97b", categoryName: "Sharing", displayOrder: 4, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "53883478-8a75-47d8-b57f-c6531393fbf7", categoryName: "Milestones", displayOrder: 5, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "c3e27a0d-521d-4c06-8b9f-64552a419918", categoryName: "Class", displayOrder: 6, createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BadgeCategories");

  }
};
