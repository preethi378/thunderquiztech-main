import { DataTypes, Sequelize } from "sequelize";

export class Posts {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "posts",
            {
                postid : {
                    type: DataTypes.NUMBER
                },
                title : {
                    type: DataTypes.STRING
                },
                description : {
                    type: DataTypes.STRING
                },
                image_url: {
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