import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('UserStats', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      currentXP: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      requiredXP: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      streak: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      lastStreakDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      coins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      badges: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    // Add indexes
    await queryInterface.addIndex('UserStats', ['userId']);
    await queryInterface.addIndex('UserStats', ['level']);
    await queryInterface.addIndex('UserStats', ['streak']);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('UserStats');
  },
}; 