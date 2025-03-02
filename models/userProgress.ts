import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface UserProgressAttributes {
  id: number;
  sessionId: number;
  cardId: number;
  isCorrect: boolean;
  answeredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface UserProgressCreationAttributes
  extends Optional<UserProgressAttributes, "id" | "answeredAt"> { }

export class UserProgress
  extends Model<UserProgressAttributes, UserProgressCreationAttributes>
  implements UserProgressAttributes {
  public id!: number;
  public sessionId!: number;
  public cardId!: number;
  public isCorrect!: boolean;
  public answeredAt!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
  public static associate(models: { [key: string]: any }) {
    UserProgress.belongsTo(models.UserSession, { foreignKey: "sessionId", as: "session" });
    UserProgress.belongsTo(models.Card, { foreignKey: "cardId", as: "card" });
  }
}

export default (sequelize: Sequelize) => {
  UserProgress.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      sessionId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "UserSessions",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      cardId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Cards",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      answeredAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
      sequelize,
      modelName: "UserProgress",
    }
  );

  return UserProgress;
};
