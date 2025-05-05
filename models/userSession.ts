import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import db from '../models';

export interface UserSessionAttributes {
  id: string;
  userId: string;
  setId: string;
  sessionType: string;
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
  public id!: string;
  public userId!: string;
  public setId!: string;
  public completed!: boolean;
  public sessionType!: string;
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
    },
    setId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionType: {
      type: DataTypes.ENUM(
        "write", "multi-choice", "fill-in", "drag-and-drop",
        "true-false", "matching", "flashcard"
      ),
      allowNull: false,
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

db.UserSession = UserSession;
export default UserSession;
