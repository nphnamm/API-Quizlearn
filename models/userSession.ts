import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import db from '../models';

export interface UserSessionAttributes {
  id: number;
  userId: string;
  setId: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserSessionCreationAttributes
  extends Optional<UserSessionAttributes, "id" | "completed" | "createdAt" | "updatedAt"> {}

export class UserSession
  extends Model<UserSessionAttributes, UserSessionCreationAttributes>
  implements UserSessionAttributes
{
  public id!: number;
  public userId!: string;
  public setId!: number;
  public completed!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static associate(models: { [key: string]: any }) {
    UserSession.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    UserSession.belongsTo(models.Set, { foreignKey: "setId", as: "set" });
    UserSession.hasMany(models.UserProgress, { foreignKey: "sessionId", as: "progress" });
  }
}

UserSession.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
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
    setId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Sets",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
  },
  {
    sequelize: db.sequelize,
    modelName: "UserSession",
  }
);

// Add the model to db
db.UserSession = UserSession;

export default UserSession;
