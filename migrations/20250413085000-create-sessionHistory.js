'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SessionHistories", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      sessionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "UserSessions",
          key: "id",
        },
        onDelete: "CASCADE",
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
      setId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Sets",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      sessionType: {
        type: Sequelize.ENUM(
          "write",
          "multi-choice",
          "fill-in",
          "drag-and-drop",
          "true-false",
          "matching",
          "flashcard",
          "test"
        ),
        allowNull: false,
      },
      totalCards: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      correctAnswers: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      wrongAnswers: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      timeSpent: {
        type: Sequelize.INTEGER, // in seconds
        allowNull: false,
        defaultValue: 0,
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
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
    await queryInterface.dropTable("SessionHistories");
  }
};