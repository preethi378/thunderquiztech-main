"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const sequelize_1 = require("sequelize");
class Customer {
    static init(sequelize) {
        return sequelize.define("customer", {
            first_name: {
                type: sequelize_1.DataTypes.STRING
            },
            last_name: {
                type: sequelize_1.DataTypes.STRING
            },
            email: {
                type: sequelize_1.DataTypes.STRING
            },
            mobile: {
                type: sequelize_1.DataTypes.STRING
            },
            password_hash: {
                type: sequelize_1.DataTypes.STRING
            },
            dob: {
                type: sequelize_1.DataTypes.STRING
            },
            gender: {
                type: sequelize_1.DataTypes.STRING
            },
            about_me: {
                type: sequelize_1.DataTypes.STRING
            },
            lives_in: {
                type: sequelize_1.DataTypes.STRING
            },
            profile_pic_image_url: {
                type: sequelize_1.DataTypes.STRING
            },
            status: {
                type: sequelize_1.DataTypes.NUMBER
            },
            games_won: {
                type: sequelize_1.DataTypes.NUMBER
            },
            hightest_score: {
                type: sequelize_1.DataTypes.NUMBER
            },
            correct_answers: {
                type: sequelize_1.DataTypes.NUMBER
            },
            xp_gained: {
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
exports.Customer = Customer;
