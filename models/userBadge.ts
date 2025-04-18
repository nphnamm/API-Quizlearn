import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';

interface UserBadgeAttributes {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: Date;
}

interface UserBadgeCreationAttributes extends Optional<UserBadgeAttributes, 'id'> {}

export class UserBadge extends Model<UserBadgeAttributes, UserBadgeCreationAttributes> implements UserBadgeAttributes {
  public id!: string;
  public userId!: string;
  public badgeId!: string;
  public earnedAt!: Date;

  static associate(models: any) {
    UserBadge.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    UserBadge.belongsTo(models.Badge, { foreignKey: 'badgeId', as: 'badge' });
  }
}

UserBadge.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  badgeId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  earnedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize: db.sequelize,
  modelName: 'UserBadge',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'badgeId']
    }
  ]
});

db.UserBadge = UserBadge;
export default UserBadge;
