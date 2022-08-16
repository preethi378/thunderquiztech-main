import { DataTypes, Sequelize } from "sequelize";

export class Todo {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "todo",
            {
                id: {
                    type: DataTypes.UUIDV4,
                    primaryKey: true,
                    allowNull: false,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                completed: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                createdAt: {
                    type: DataTypes.BIGINT,
                    defaultValue: Date.now()
                },
                updatedAt: {
                    type: DataTypes.BIGINT,
                    defaultValue: Date.now()
                },
            },
            {
                freezeTableName: true
            }
        );
    }
}