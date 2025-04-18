import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';

interface PersonalRecordAttributes {
  id: string;
  userId: string;
  recordType: string;
  recordValue: number;
  recordDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface PersonalRecordCreationAttributes extends Optional<PersonalRecordAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class PersonalRecord extends Model<PersonalRecordAttributes, PersonalRecordCreationAttributes> implements PersonalRecordAttributes {
  public id!: string;
  public userId!: string;
  public recordType!: string;
  public recordValue!: number;
  public recordDate!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    PersonalRecord.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

PersonalRecord.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  recordType: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  recordValue: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recordDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.sequelize,
  modelName: 'PersonalRecord',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'recordType']
    }
  ]
});

db.PersonalRecord = PersonalRecord;
export default PersonalRecord;
