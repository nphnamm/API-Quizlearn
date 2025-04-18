'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Badges", [
      {
        id: "3f6a26bb-2f3c-426c-8a45-0b07f192e197",
        badgeName: "First Steps",
        description: "Complete your first set",
        categoryId: "9a1629de-8544-4fcf-b48b-a660d833bac4",
        iconUrl: "https://example.com/icon1.png",
        requirement_type: "sets_completed",
        requirement_value: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Badges", null, {});

  }
};
