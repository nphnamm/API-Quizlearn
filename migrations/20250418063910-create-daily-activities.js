'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DailyActivities", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Auto-generate UUID
        primaryKey: true,
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
      activityDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      badgesEarned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      coinsEarned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      xpEarned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      setsCompleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      cardsCreated: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      studySessionsCompleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addConstraint("DailyActivities", {
      fields: ["userId", "activityDate"],
      type: "unique",
      name: "unique_user_daily_activity",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DailyActivities");

  }
};
