import { DataTypes, Sequelize } from "sequelize";

export class Quiz {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "quiz",
            {
                quiz_image : {
                    type: DataTypes.STRING
                },
                quiz_name: {
                    type: DataTypes.STRING
                },
                total_questions : {
                    type: DataTypes.STRING
                },
                total_time_allocated : {
                    type: DataTypes.STRING
                },
                quiz_description : {
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
