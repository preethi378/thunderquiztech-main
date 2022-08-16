import { DataTypes, Sequelize } from "sequelize";

export class Todos {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "todos",
            {
                
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                book_name : {
                    type: DataTypes.STRING
                },
                price : {
                    type: DataTypes.NUMBER
                },
                author : {
                    type: DataTypes.STRING
                },
                title : {
                    type: DataTypes.STRING
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