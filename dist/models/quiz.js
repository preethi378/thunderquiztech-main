"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const sequelize_1 = require("sequelize");
class Quiz {
    static init(sequelize) {
        return sequelize.define("quiz", {
            quiz_image: {
                type: sequelize_1.DataTypes.STRING
            },
            quiz_name: {
                type: sequelize_1.DataTypes.STRING
            },
            total_questions: {
                type: sequelize_1.DataTypes.STRING
            },
            total_time_allocated: {
                type: sequelize_1.DataTypes.STRING
            },
            quiz_description: {
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
exports.Quiz = Quiz;
