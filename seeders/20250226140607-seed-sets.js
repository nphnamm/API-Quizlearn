"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Sets",
      [
        {
          title: "Biology 101",
          description: "Basic biology terms",
          folderId: 1,
          isPublic: true,
          cardCount: 5,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Algebra Basics",
          description: "Intro to algebra",
          folderId: 2,
          isPublic: false,
          cardCount: 4,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "World War II",
          description: "Key events of WWII",
          folderId: 3,
          isPublic: true,
          cardCount: 6,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Spanish Vocabulary",
          description: "Common Spanish words",
          folderId: 4,
          isPublic: false,
          cardCount: 3,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Python Basics",
          description: "Python programming intro",
          folderId: 5,
          isPublic: true,
          cardCount: 4,
          statusId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Shakespeare Plays",
          description: "Famous works by Shakespeare",
          folderId: 6,
          isPublic: false,
          cardCount: 5,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Chemistry Elements",
          description: "Periodic table elements",
          folderId: 1,
          isPublic: true,
          cardCount: 3,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Deleted Set",
          description: "For testing deletion",
          folderId: 1,
          isPublic: false,
          cardCount: 2,
          statusId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sets', null, {});
  },
};
