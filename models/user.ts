import { Sequelize, DataTypes, Model, Optional, Association } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from '../models';

// Định nghĩa các thuộc tính của User
export interface UserAttributes {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar?: string;
  provider?: string;
  statusId: number;
  experiencePoints: number;
  level: number;
  expToNextLevel: number;
  coins: number;
  currentStreak: number;
  longestStreak: number;
  lastStreakDate: Date;
  roleId: string;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "firstName" | "lastName" | "avatar"
  > { }

// Định nghĩa class User
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: string;
  public username!: string;
  public firstName?: string;
  public lastName?: string;
  public email!: string;
  public phoneNumber!: string;
  public password!: string;
  public avatar?: string;
  public provider?: string;
  public statusId!: number;
  public experiencePoints!: number;
  public level!: number;
  public expToNextLevel!: number;
  public coins!: number;
  public currentStreak!: number;
  public longestStreak!: number;
  public lastStreakDate!: Date;
  public roleId!: string;

  //Associations
  public static associate(models: { [key: string]: any }) {
    User.hasMany(models.Folder, { foreignKey: "userId", as: "folders" });
    User.hasMany(models.Set, { foreignKey: "userId", as: "sets" });
    User.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
  }

  public static async softDelete(userId: number): Promise<void> {
    const user = await User.findByPk(userId);
    if (user) {
      user.statusId = 3; // "3" đại diện cho trạng thái "đã xóa"
      await user.save();
    }
  }
  public SignAccessToken(): string {
    return jwt.sign({ id: this.id }, process.env.ACCESS_TOKEN || "", {
      expiresIn: "3h",
    });
  }
  public async comparePassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  }
  // Phương thức tạo RefreshToken
  public SignRefreshToken(): string {
    return jwt.sign({ id: this.id }, process.env.REFRESH_TOKEN || "", {
      expiresIn: "3d",
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true, // Optional field
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true, // Optional field
      validate: {
        isNumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1 // Active by default
    },
    experiencePoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    expToNextLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    coins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    currentStreak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    longestStreak: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lastStreakDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    roleId:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:'874f51b7-87f6-426d-bc0f-01344748a52a',
      references: { 
        model: 'Roles', 
        key: 'id' 
      }
    }
  },
  {
    sequelize: db.sequelize,
    modelName: "User",
  }
);

// Add the model to db
db.User = User;

export default User;
