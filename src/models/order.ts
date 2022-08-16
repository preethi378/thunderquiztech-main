import { DataTypes, Sequelize } from "sequelize";

export class Order {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "order",
            {
                password_hash: {
                    type: DataTypes.STRING
                },
                dob: {
                    type: DataTypes.STRING
                },
                gender: {
                    type: DataTypes.STRING
                },
                about_me: {
                    type: DataTypes.STRING
                },
               
            },
            {
                freezeTableName: true
            }
        );
    }
}