import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import db from '../models';

// Define SessionHistory attributes
export interface SessionHistoryAttributes {
  id: string;
  sessionId: string;
  userId: string;
  setId: string;
  sessionType: 'write' | 'multi-choice' | 'fill-in' | 'drag-and-drop' | 'true-false' | 'matching' | 'flashcard' | 'test';
  totalCards: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  timeSpent: number;
  completedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define optional attributes for creation
interface SessionHistoryCreationAttributes extends Optional<SessionHistoryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define SessionHistory class
export class SessionHistory 
  extends Model<SessionHistoryAttributes, SessionHistoryCreationAttributes>
  implements SessionHistoryAttributes {
  public id!: string;
  public sessionId!: string;
  public userId!: string;
  public setId!: string;
  public sessionType!: 'write' | 'multi-choice' | 'fill-in' | 'drag-and-drop' | 'true-false' | 'matching' | 'flashcard' | 'test';
  public totalCards!: number;
  public correctAnswers!: number;
  public wrongAnswers!: number;
  public score!: number;
  public timeSpent!: number;
  public completedAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public static associate(models: { [key: string]: any }) {
    SessionHistory.belongsTo(models.UserSession, {
      foreignKey: 'sessionId',
      as: 'session'
    });
    
    SessionHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    
    SessionHistory.belongsTo(models.Set, {
      foreignKey: 'setId',
      as: 'set'
    });
  }
}

SessionHistory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'UserSessions',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    setId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Sets',
        key: 'id'
      }
    },
    sessionType: {
      type: DataTypes.ENUM(
        'write',
        'multi-choice',
        'fill-in',
        'drag-and-drop',
        'true-false',
        'matching',
        'flashcard',
        'test'
      ),
      allowNull: false,
    },
    totalCards: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    correctAnswers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    wrongAnswers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    timeSpent: {
      type: DataTypes.INTEGER, // in seconds
      allowNull: false,
      defaultValue: 0,
    },
    completedAt: {
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
    sequelize: db.sequelize,
    modelName: "SessionHistory",
  }
);

// Add the model to db
db.SessionHistory = SessionHistory;

export default SessionHistory;