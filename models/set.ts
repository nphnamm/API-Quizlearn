import { Sequelize, DataTypes, Model, Optional, Op } from 'sequelize';
import db from '../models';

export interface SetAttributes {
  id: string;
  title: string;
  description?: string;
  userId: string;
  folderId?: string;
  isPublic: boolean;
  isDraft: boolean;
  cardCount: number;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SetCreationAttributes extends Optional<SetAttributes, 'id' | 'description' | 'folderId' | 'cardCount' | 'createdAt' | 'updatedAt'> {}

export class Set extends Model<SetAttributes, SetCreationAttributes> implements SetAttributes {
  public id!: string;
  public title!: string;
  public description?: string;
  public userId!: string;
  public folderId?: string;
  public isPublic!: boolean;
  public cardCount!: number;
  public statusId!: number;
  public isDraft!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static associate(models: { [key: string]: any }) {
    Set.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Set.belongsTo(models.Folder, { foreignKey: 'folderId', as: 'folder' });
    Set.hasMany(models.Card, { foreignKey: 'setId', as: 'cards' });
    Set.hasMany(models.UserSession, { foreignKey: 'setId', as: 'sessions' });  }

  public async updateCardCount(): Promise<void> {
    this.cardCount = await this.sequelize!.models.Card.count({
      where: {
        setId: this.id,
        statusId: { [Op.ne]: 3 }
      }
    });
    await this.save();
  }

  public static async softDelete(setId: string): Promise<void> {
    const set = await Set.findByPk(setId);
    if (set) {
      set.statusId = 3;
      await set.save();
    }
  }
}

Set.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: true },
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  folderId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  cardCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  isDraft: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize: db.sequelize,
  modelName: 'Set',
});

db.Set = Set;
export default Set;
