import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';

interface BadgeAttributes {
  id: string;
  badgeName: string;
  description?: string;
  categoryId: string;
  iconUrl: string;
  requirement_type: string;
  requirement_value: number;
  createdAt: Date;
  updatedAt: Date;
}

interface BadgeCreationAttributes extends Optional<BadgeAttributes, 'id' | 'description' | 'createdAt' | 'updatedAt'> {}

export class Badge extends Model<BadgeAttributes, BadgeCreationAttributes> implements BadgeAttributes {
  public id!: string;
  public badgeName!: string;
  public description?: string;
  public categoryId!: string;
  public iconUrl!: string;
  public requirement_type!: string;
  public requirement_value!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    Badge.belongsTo(models.BadgeCategory, { foreignKey: 'categoryId', as: 'category' });
    Badge.hasMany(models.UserBadge, { foreignKey: 'badgeId', as: 'userBadges' });
  }
}

Badge.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  badgeName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: DataTypes.TEXT,
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'BadgeCategories', key: 'id' },
    onDelete: 'CASCADE'
  },
  iconUrl: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  requirement_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  requirement_value: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.sequelize,
  modelName: 'Badge'
});

db.Badge = Badge;
export default Badge;
