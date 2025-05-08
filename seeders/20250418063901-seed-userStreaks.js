'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, get some user IDs from the Users table


    const userId = "82d7fb57-9190-43d2-b501-606222e37228";

    // Sample streak data
    const streaks = [
      {
        id: "9492d0e8-2d7a-48a9-b68b-5661632136ae",
        userId: '82d7fb57-9190-43d2-b501-606222e37228',
        startDate: '2025-03-01',
        endDate: '2025-03-10',
        streakLength: 10,
        isActive: false,
        createdAt: '2025-03-01',
        updatedAt: '2025-03-10'
      },
      {
        id: "43d331c6-cb03-485e-8ea9-c693e28162bb",
        userId: userId,
        startDate: '2025-04-20',
        endDate: '2025-04-20',
        streakLength: 1,
        isActive: false,
        createdAt: '2025-04-20',
        updatedAt: '2025-04-20'
      },
      {
        id: "6a098a01-f800-4ffe-9126-8b3efab05ad9",
        userId: userId,
        startDate: '2025-04-23',
        endDate: null,
        streakLength: 14, // Assuming today is 8/5/2025
        isActive: true,
        createdAt: '2025-04-23',
        updatedAt: '2025-05-07'
      }
    ];

    // Insert the streaks
    await queryInterface.bulkInsert('UserStreaks', streaks, {});


  },

  async down(queryInterface, Sequelize) {
    // Remove all streaks
    await queryInterface.bulkDelete('UserStreaks', null, {});
  }
}; 