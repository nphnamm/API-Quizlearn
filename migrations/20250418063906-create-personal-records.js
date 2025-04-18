'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PersonalRecords", {
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
      recordType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recordValue: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recordDate: {
        type: Sequelize.DATE,
        allowNull: false,
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

    await queryInterface.addConstraint("PersonalRecords", {
      fields: ["userId", "recordType"],
      type: "unique",
      name: "unique_user_record_type",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PersonalRecords");

  }
};
