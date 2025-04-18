import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';

interface DailyActivityAttributes {
  id: string;
  userId: string;
  activityDate: Date;
  badgesEarned: number;
  coinsEarned: number;
  xpEarned: number;
  setsCompleted: number;
  cardsCreated: number;
  studySessionsCompleted: number;
  createdAt: Date;
  updatedAt: Date;
}

interface DailyActivityCreationAttributes extends Optional<DailyActivityAttributes, 'id' | 'badgesEarned' | 'coinsEarned' | 'xpEarned' | 'setsCompleted' | 'cardsCreated' | 'studySessionsCompleted' | 'createdAt' | 'updatedAt'> {}

export class DailyActivity extends Model<DailyActivityAttributes, DailyActivityCreationAttributes> implements DailyActivityAttributes {
  public id!: string;
  public userId!: string;
  public activityDate!: Date;
  public badgesEarned!: number;
  public coinsEarned!: number;
  public xpEarned!: number;
  public setsCompleted!: number;
  public cardsCreated!: number;
  public studySessionsCompleted!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    DailyActivity.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

DailyActivity.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  activityDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  badgesEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  coinsEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  xpEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  setsCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  cardsCreated: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  studySessionsCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.sequelize,
  modelName: 'DailyActivity',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'activityDate']
    }
  ]
});

db.DailyActivity = DailyActivity;
export default DailyActivity;
