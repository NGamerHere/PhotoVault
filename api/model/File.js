import { Sequelize, DataTypes } from 'sequelize';
import sequelize from "../services/Db.js";

const File = sequelize.define('File', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    filename: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    uploadedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'files',
    timestamps: true,
    updatedAt: 'updatedAt',
    uploadedAt: 'uploadedAt',
});

export default File;
