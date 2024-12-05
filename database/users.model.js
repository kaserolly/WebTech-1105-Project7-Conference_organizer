import { DataTypes } from 'sequelize';
import { sequelize } from './database.js';

export const Users = sequelize.define('User', {
    username: { type: DataTypes.STRING, primaryKey: true },
    ID: DataTypes.STRING,
    role: DataTypes.STRING,
});

