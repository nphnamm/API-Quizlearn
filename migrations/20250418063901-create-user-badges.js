'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserBadges", {
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
      badgeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Badges",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      earnedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
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

    await queryInterface.addConstraint("UserBadges", {
      fields: ["userId", "badgeId"],
      type: "unique",
      name: "unique_user_badge_pair",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserBadges");

  }
};
