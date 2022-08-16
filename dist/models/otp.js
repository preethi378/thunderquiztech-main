"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const sequelize_1 = require("sequelize");
class Otp {
    static init(sequelize) {
        return sequelize.define("otp", {
            otp: {
                type: sequelize_1.DataTypes.NUMBER
            },
            expires_in_minute: {
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
exports.Otp = Otp;
