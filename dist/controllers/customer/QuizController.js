"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
class QuizController {
    static getQuizList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usermobile } = req.body;
                const tsetting = yield models_1.default.ThunderQuizTechSetting.findOne({ where: { status: 1 } });
                const quizlist = yield models_1.default.Quiz.findAll({ raw: true });
                if (!quizlist) {
                    req.errorStatus = 404;
                    return next(new Error("Quiz List Not available"));
                }
                for (let i = 0; i < quizlist.length; i++) {
                    quizlist[i].total_time_allocated = parseInt(tsetting.quiz_no_of_question) * parseInt(tsetting.per_question_time);
                    quizlist[i].total_questions = tsetting.quiz_no_of_question;
                }
                return res.status(200).json({
                    status: 200,
                    message: "Quiz List fetched.",
                    data: quizlist,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createQuiz(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield models_1.default.Quiz.findOne({ where: { quiz_name: data.quiz_name } });
                if (result) {
                    return res.status(404).json({
                        status: 404,
                        message: "Already Added",
                    });
                }
                let quiz = yield models_1.default.Quiz.create(data);
                return res.status(200).json({
                    status: 200,
                    message: "Quiz Created successfully.",
                    data: quiz
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static createQuizQuestion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield models_1.default.QuizQuestion.findOne({ where: { question: data.question, quizid: data.quizid } });
                if (result) {
                    return res.status(404).json({
                        status: 404,
                        message: "Already Added",
                    });
                }
                let quizquestion = yield models_1.default.QuizQuestion.create(data);
                return res.status(200).json({
                    status: 200,
                    message: "Quiz Question Created successfully.",
                    data: quizquestion
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getQuizQuestionList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = req.body;
                const tsetting = yield models_1.default.ThunderQuizTechSetting.findOne({ where: { status: 1 } });
                const quizquestionlist = yield models_1.default.QuizQuestion.findAll({
                    where: { quizid: quiz.quizid },
                    order: sequelize_1.Sequelize.literal('rand()'),
                    limit: tsetting.quiz_no_of_question
                });
                if (!quizquestionlist) {
                    req.errorStatus = 404;
                    return next(new Error("Quiz Questions Not available"));
                }
                return res.status(200).json({
                    status: 200,
                    message: "Quiz Question fetched.",
                    data: quizquestionlist,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static submitQuizResult(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield models_1.default.Customer.findOne({ where: { mobile: data.usermobile }, raw: true });
                if (!user) {
                    req.errorStatus = 404;
                    return next(new Error("User does not exists in system."));
                }
                var resultdata = {
                    userid: user.id,
                    quizid: data.quizid,
                    total_questions: data.total_questions,
                    correct_ans: data.correct_answer,
                    incorrect_ans: data.incorrect_answer,
                    questions_skipped: data.questions_skipped,
                    quiz_duration: data.quiz_duration,
                    status: 0
                };
                const result = yield models_1.default.QuizResult.create(resultdata);
                if (!result) {
                    req.errorStatus = 404;
                    return next(new Error("Quiz Result Not Submitted"));
                }
                var games_won = user.games_won;
                var hightest_score = user.hightest_score;
                var correct_answers = parseInt(user.correct_answers) + parseInt(data.correct_answer);
                var xp_gained = parseInt(user.xp_gained) + (data.correct_answer * 10);
                if (data.correct_answer == data.total_questions) {
                    games_won = games_won + 1;
                }
                if (hightest_score < (data.correct_answer * 10)) {
                    console.log("heighest score");
                    console.log(hightest_score);
                    hightest_score = data.correct_answer * 10;
                }
                var updatestatsdata = {
                    games_won: games_won,
                    hightest_score: hightest_score,
                    correct_answers: correct_answers,
                    xp_gained: xp_gained
                };
                yield models_1.default.Customer.update(updatestatsdata, { where: { id: user.id } });
                return res.status(200).json({
                    status: 200,
                    message: "Quiz Result Submitted successfully.",
                    data: result
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getQuizLeaderBoard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = req.body;
                const leaderboarddata = yield models_1.default.Customer.findAll({
                    where: {},
                    order: [['xp_gained', 'DESC']],
                    raw: true
                });
                if (!leaderboarddata) {
                    req.errorStatus = 404;
                    return next(new Error("Data Not available"));
                }
                return res.status(200).json({
                    status: 200,
                    message: "Leader Board fetched.",
                    data: leaderboarddata,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.QuizController = QuizController;
