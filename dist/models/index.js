"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env_1 = require("../environments/env");
const customer_1 = require("./customer");
const otp_1 = require("./otp");
const quiz_1 = require("./quiz");
const quizquestion_1 = require("./quizquestion");
const quizresult_1 = require("./quizresult");
const thunderquiztechsetting_1 = require("./thunderquiztechsetting");
let dbOptions = (0, env_1.getEnvironmentVariables)().db_options;
var sequelize = new sequelize_1.Sequelize(dbOptions.db, dbOptions.username, dbOptions.password, {
    host: dbOptions.host,
    dialect: 'mysql'
});
sequelize.authenticate().then((success) => console.log('connected')).catch((err) => console.log('problem in connecting to sequelize:', err));
const Model = {
    Customer: customer_1.Customer.init(sequelize),
    Otp: otp_1.Otp.init(sequelize),
    Quiz: quiz_1.Quiz.init(sequelize),
    QuizQuestion: quizquestion_1.QuizQuestion.init(sequelize),
    QuizResult: quizresult_1.QuizResult.init(sequelize),
    ThunderQuizTechSetting: thunderquiztechsetting_1.ThunderQuizTechSetting.init(sequelize)
};
exports.default = Model;
