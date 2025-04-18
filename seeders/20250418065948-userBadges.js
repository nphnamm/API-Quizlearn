'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("UserBadges", [
      {
        id: "fde46d1a-bff7-42bb-942a-a8995a5bf468",
        userId: "82d7fb57-9190-43d2-b501-606222e37228",
        badgeId: "3f6a26bb-2f3c-426c-8a45-0b07f192e197",
        earnedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserBadges", null, {});

  }
};
