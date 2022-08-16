import { DataTypes, Sequelize } from "sequelize";

export class QuizResult {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "quizresult",
            {
                userid : {
                    type: DataTypes.NUMBER
                },
                quizid: {
                    type: DataTypes.NUMBER
                },
                total_questions : {
                    type: DataTypes.NUMBER
                },
                correct_ans : {
                    type: DataTypes.NUMBER
                },
                incorrect_ans : {
                    type: DataTypes.NUMBER
                },
                questions_skipped : {
                    type: DataTypes.NUMBER
                },
                quiz_duration :{
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

// if number of correct_ans is == total_questions then won else not won