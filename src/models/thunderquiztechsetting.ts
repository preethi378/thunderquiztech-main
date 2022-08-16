import { DataTypes, Sequelize } from "sequelize";

export class ThunderQuizTechSetting {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "thunderquiztechsetting",
            {
                quiz_no_of_question : {
                    type: DataTypes.NUMBER
                },
                per_question_time: {
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
