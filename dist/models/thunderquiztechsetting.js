"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThunderQuizTechSetting = void 0;
const sequelize_1 = require("sequelize");
class ThunderQuizTechSetting {
    static init(sequelize) {
        return sequelize.define("thunderquiztechsetting", {
            quiz_no_of_question: {
                type: sequelize_1.DataTypes.NUMBER
            },
            per_question_time: {
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
exports.ThunderQuizTechSetting = ThunderQuizTechSetting;
