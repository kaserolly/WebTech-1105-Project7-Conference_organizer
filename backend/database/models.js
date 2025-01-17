import { DataTypes } from 'sequelize';
import sequelize from './database.js';

// Users
export const Users = sequelize.define('Users', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    ID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    role: { type: DataTypes.STRING, allowNull: false },
});

// Conferences
export const Conferences = sequelize.define('Conferences', {
    name: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    organizerID: { type: DataTypes.UUID, allowNull: false },
});

// Articles
export const Articles = sequelize.define('Articles', {
    title: { type: DataTypes.STRING, allowNull: false },
    abstract: { type: DataTypes.TEXT, allowNull: false },
    fileURL: { type: DataTypes.STRING, allowNull: false },
    authorID: { type: DataTypes.UUID, allowNull: false },
    conferenceID: { type: DataTypes.UUID, allowNull: false },
});

// Reviews
export const Reviews = sequelize.define('Reviews', {
    reviewerID: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.ENUM('approved', 'revisions_required'), allowNull: false },
    comments: { type: DataTypes.TEXT, allowNull: true },
    articleID: { type: DataTypes.UUID, allowNull: false },
});
