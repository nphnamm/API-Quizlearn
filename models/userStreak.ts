import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';

interface UserStreakAttributes {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date | null;
  streakLength: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserStreakCreationAttributes extends Optional<UserStreakAttributes, 'id' | 'endDate' | 'createdAt' | 'updatedAt'> {}

export class UserStreak extends Model<UserStreakAttributes, UserStreakCreationAttributes> implements UserStreakAttributes {
  public id!: string;
  public userId!: string;
  public startDate!: Date;
  public endDate!: Date | null;
  public streakLength!: number;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    UserStreak.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

UserStreak.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  streakLength: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize: db.sequelize,
  modelName: 'UserStreak',
  indexes: [
    {
      fields: ['userId', 'startDate']
    }
  ]
});

export default UserStreak; 