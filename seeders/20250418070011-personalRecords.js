'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PersonalRecords", [
      {
        id: "3035a687-b3fc-4e0a-8a4e-9302aadbc62c",
        userId: "82d7fb57-9190-43d2-b501-606222e37228",
        recordType: "xp_in_day",
        recordValue: 500,
        recordDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PersonalRecords", null, {});

  }
};
