import { DataTypes, Sequelize } from "sequelize";

export class Customer {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "customer",
            {
                first_name : {
                    type: DataTypes.STRING
                },
                last_name : {
                    type: DataTypes.STRING
                },
                email : {
                    type: DataTypes.STRING
                },
                mobile : {
                    type: DataTypes.STRING
                },
                password_hash: {
                    type: DataTypes.STRING
                },
                dob: {
                    type: DataTypes.STRING
                },
                gender: {
                    type: DataTypes.STRING
                },
                about_me: {
                    type: DataTypes.STRING
                },
                lives_in: {
                    type: DataTypes.STRING
                },
                profile_pic_image_url: {
                    type: DataTypes.STRING
                },
                status : {
                    type: DataTypes.NUMBER
                },
                games_won : {
                    type: DataTypes.NUMBER
                },
                hightest_score : {
                    type: DataTypes.NUMBER
                },
                correct_answers : {
                    type: DataTypes.NUMBER
                },
                xp_gained : {
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