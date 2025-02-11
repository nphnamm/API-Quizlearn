'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Dialect } from 'sequelize';
import process from 'process';
import configFile from '../config/config.json';

// Lấy môi trường hiện tại (development, test, production)
const env = process.env.NODE_ENV || 'test';

type Config = typeof configFile;

const config: Config = configFile;

const configForEnv = config[env as keyof Config]; // Sử dụng keyof để chỉ rõ key

const sequelize = new Sequelize(configForEnv.database, configForEnv.username, configForEnv.password, {
  ...configForEnv,
  dialect: configForEnv.dialect as Dialect,
  dialectOptions: configForEnv.dialectOptions,
  logging: false, 
});

const db: { [key: string]: any } = {};

// Đọc tất cả các file model trong thư mục hiện tại (ngoại trừ file này)
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
    db[model.name] = model;
     console.log(`Loaded model: ${model.name}`); // Thêm log để kiểm tra model đã được load
  });

// Gọi các association (nếu có) cho các model
Object.keys(db).forEach((modelName) => {
  if (db[modelName] && 'associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

// Gắn Sequelize instance và lớp Sequelize vào đối tượng db
db.sequelize = sequelize;
db.Sequelize = Sequelize;
console.log(db); // Thêm log để kiểm tra đối tượng db

export default db;