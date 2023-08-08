import { DataTypes } from 'sequelize';
export const managerAttributes = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    budget: DataTypes.TINYINT
}

export const managerOptions = { tableName: "managers" }