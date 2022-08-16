"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizQuestion = void 0;
const sequelize_1 = require("sequelize");
class QuizQuestion {
    static init(sequelize) {
        return sequelize.define("quizquestion", {
            quizid: {
                type: sequelize_1.DataTypes.NUMBER
            },
            question: {
                type: sequelize_1.DataTypes.STRING
            },
            option_a: {
                type: sequelize_1.DataTypes.STRING
            },
            option_b: {
                type: sequelize_1.DataTypes.STRING
            },
            option_c: {
                type: sequelize_1.DataTypes.STRING
            },
            option_d: {
                type: sequelize_1.DataTypes.STRING
            },
            correct_option: {
                type: sequelize_1.DataTypes.STRING
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
exports.QuizQuestion = QuizQuestion;
