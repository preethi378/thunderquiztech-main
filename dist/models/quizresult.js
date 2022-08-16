"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizResult = void 0;
const sequelize_1 = require("sequelize");
class QuizResult {
    static init(sequelize) {
        return sequelize.define("quizresult", {
            userid: {
                type: sequelize_1.DataTypes.NUMBER
            },
            quizid: {
                type: sequelize_1.DataTypes.NUMBER
            },
            total_questions: {
                type: sequelize_1.DataTypes.NUMBER
            },
            correct_ans: {
                type: sequelize_1.DataTypes.NUMBER
            },
            incorrect_ans: {
                type: sequelize_1.DataTypes.NUMBER
            },
            questions_skipped: {
                type: sequelize_1.DataTypes.NUMBER
            },
            quiz_duration: {
                type: sequelize_1.DataTypes.NUMBER
            },
            status: {
                type: sequelize_1.DataTypes.NUMBER
            },
            createdAt: {
                type: sequelize_1.DataTypes.BIGINT,
                defaultValue: Date.now()
            },
            updatedAt: {
                type: sequelize_1.DataTypes.BIGINT,
                defaultValue: Date.now()
            },
        }, {
            freezeTableName: true
        });
    }
}
exports.QuizResult = QuizResult;
// if number of correct_ans is == total_questions then won else not won
