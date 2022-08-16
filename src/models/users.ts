import { DataTypes, Sequelize } from "sequelize";

export class Users{
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "users",
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                none: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                idade: {
                    type: DataTypes.INTEGER,
                },
            },
            {
                freezeTableName: true
            }
        );
    }
}
