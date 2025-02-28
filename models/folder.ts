import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Import Op from Sequelize
const { Op } :any= Sequelize;

export interface FolderAttributes {
    id: number;
    name: string;
    description?: string;
    userId: number;
    isPublic: boolean;
    statusId: number;
    createdAt: Date;
    updatedAt: Date;
}

interface FolderCreationAttributes extends Optional<FolderAttributes, 'id' | 'description' | 'createdAt' | 'updatedAt'> { }

export class Folder extends Model<FolderAttributes, FolderCreationAttributes> implements FolderAttributes {
    public id!: number;
    public name!: string;
    public description?: string;
    public userId!: number;
    public isPublic!: boolean;
    public statusId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    public static associate(models: { [key: string]: any }) {
        Folder.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Folder.hasMany(models.Set, { foreignKey: 'folderId', as: 'sets' });
    }

    public async toggleVisibility(): Promise<void> {
        this.isPublic = !this.isPublic;
        await this.save();
    }

    public async getSetCount(): Promise<number> {
        return await this.sequelize!.models.Set.count({
            where: {
                folderId: this.id,
                statusId: { [Op.ne]: 3 } // Exclude soft-deleted sets
            }
        });
    }

    public static async softDelete(folderId: number): Promise<void> {
        const folder = await Folder.findByPk(folderId);
        if (folder) {
            folder.statusId = 3; // Mark as deleted
            await folder.save();
        }
    }
}

export default (sequelize: Sequelize) => {
    Folder.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: { notEmpty: true }
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
            onDelete: 'CASCADE'
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Statuses', key: 'id' },
            onDelete: 'SET NULL',
            defaultValue: 1 // Active by default
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Folder',
    });

    return Folder;
};