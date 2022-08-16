import { DataTypes, Sequelize } from "sequelize";


export class Otp {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "otp",
            {
                otp : {
                    type: DataTypes.NUMBER
                },
                expires_in_minute: {
                    type: DataTypes.NUMBER
                },
                status : {
                    type: DataTypes.NUMBER
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
