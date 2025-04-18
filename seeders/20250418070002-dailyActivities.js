'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("DailyActivities", [
      {
        id: "9bafcc4e-87d4-474e-a4d1-7a618f6c2022",
        userId: "82d7fb57-9190-43d2-b501-606222e37228",
        activityDate: new Date(),
        badgesEarned: 1,
        coinsEarned: 100,
        xpEarned: 500,
        setsCompleted: 1,
        cardsCreated: 5,
        studySessionsCompleted: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DailyActivities", null, {});
  }
};
