import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// Định nghĩa các thuộc tính của User
export interface UserAttributes {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    password: string;
    avatar?: string;
    statusId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'firstName' | 'lastName' | 'avatar'> { }

// Định nghĩa class User
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public firstName?: string;
    public lastName?: string;
    public email!: string;
    public phoneNumber!: string;
    public password!: string;
    public avatar?: string;
    public statusId!: number;


    //Associations
    public static associate(models:{[key:string]:any}){
        User.hasMany(models.Folder,{foreignKey:"userId",as:"folders"})
        User.hasMany(models.Set, { foreignKey: 'userId', as: 'sets' });
    }
    public static async softDelete(userId: number): Promise<void> {
        const user = await User.findByPk(userId);
        if (user) {
            user.statusId = 3; // "3" đại diện cho trạng thái "đã xóa"
            await user.save();
        }
    }
    public SignAccessToken(): string {
        return jwt.sign({ id: this.id }, process.env.ACCESS_TOKEN || '', {
            expiresIn: "5m",
        })
    }
    public async comparePassword(enteredPassword: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, this.password);
    }
    // Phương thức tạo RefreshToken
    public SignRefreshToken(): string {
        return jwt.sign({ id: this.id }, process.env.REFRESH_TOKEN || '', {
            expiresIn: "3d",
        })
    }
}

export default (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
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
            statusId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Statuses', // Assuming you have a 'Statuses' table
                    key: 'id',
                },
                onDelete: 'SET NULL',
                defaultValue: 1,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    return User;
};
