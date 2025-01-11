'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import process from 'process';
import { Model, ModelStatic } from 'sequelize';
import configFile from '../config/config.json';

// Lấy môi trường hiện tại (development, test, production)
const env = process.env.NODE_ENV || 'test';
import configJson from '../config/config.json';

type Config = typeof configFile;

const config: Config = configFile;

const configForEnv = config[env as keyof Config]; // Sử dụng keyof để chỉ rõ key


interface DB {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    [key: string]: ModelStatic<Model> | Sequelize | typeof Sequelize;
}

const db: DB = {
    sequelize: undefined as unknown as Sequelize, // Sẽ được khởi tạo sau
    Sequelize: Sequelize,
};
// Khởi tạo Sequelize
let sequelize: Sequelize;
// Kiểm tra nếu use_env_variable tồn tại và không phải là null hoặc undefined
if (configForEnv.use_env_variable && process.env[configForEnv.use_env_variable]) {
    // Kiểm tra xem biến môi trường có chứa chuỗi kết nối
    sequelize = new Sequelize(process.env[configForEnv.use_env_variable] as string, {
      dialect: configForEnv.dialect as 'mysql' | 'mariadb' | 'postgres' | 'mssql',
      dialectOptions: configForEnv.dialectOptions,
      logging: false, // Tùy chọn thêm để tắt logging, có thể thay đổi tùy vào nhu cầu
    });
  } else {
    // Nếu không có use_env_variable hoặc nó không hợp lệ, sử dụng các tham số trực tiếp
    console.log(configForEnv);
    sequelize = new Sequelize(configForEnv.database, configForEnv.username, configForEnv.password, {
      host: configForEnv.host,
      dialect: configForEnv.dialect as 'mysql' | 'mariadb' | 'postgres' | 'mssql',
      port: configForEnv.port,
      dialectOptions: configForEnv.dialectOptions,
      logging: false, // Tùy chọn thêm để tắt logging, có thể thay đổi tùy vào nhu cầu
    });
  }

// Đọc tất cả các file model trong thư mục hiện tại (ngoại trừ file này)
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.ts' && // Lọc các file TypeScript
            file.indexOf('.test.ts') === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
        db[model.name] = model;
    });

// Gọi các association (nếu có) cho các model
Object.keys(db).forEach((modelName) => {
    if (db[modelName] && 'associate' in db[modelName]) {
        (db[modelName] as any).associate(db);
    }
});

// Gắn Sequelize instance và lớp Sequelize vào đối tượng db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
