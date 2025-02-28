"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Folders",
      [
        {
          name: "Science",
          description: "All science-related study materials",
          userId: 5,
          isPublic: true,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Math",
          description: "Mathematics topics",
          userId: 5,
          isPublic: false,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "History",
          description: "Historical events and figures",
          userId: 5,
          isPublic: true,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Languages",
          description: "Language learning resources",
          userId: 5,
          isPublic: false,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Programming",
          description: "Coding concepts",
          userId: 4,
          isPublic: true,
          statusId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Literature",
          description: "Books and authors",
          userId: 5,
          isPublic: false,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Deleted Folder",
          description: "For testing deletion",
          userId: 5,
          isPublic: false,
          statusId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Folders", null, {});
  },
};
