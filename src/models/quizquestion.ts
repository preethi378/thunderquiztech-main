import { DataTypes, Sequelize } from "sequelize";

export class QuizQuestion {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "quizquestion",
            {
                quizid : {
                    type: DataTypes.NUMBER
                },
                question: {
                    type: DataTypes.STRING
                },
                option_a : {
                    type: DataTypes.STRING
                },
                option_b : {
                    type: DataTypes.STRING
                },
                option_c : {
                    type: DataTypes.STRING
                },
                option_d : {
                    type: DataTypes.STRING
                },
                correct_option : {
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
