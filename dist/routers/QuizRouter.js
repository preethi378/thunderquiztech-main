"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QuizController_1 = require("../controllers/customer/QuizController");
const GlobalMiddleWares_1 = require("../middlewares/GlobalMiddleWares");
class CustomerRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get("/getquizlist", GlobalMiddleWares_1.GlobalMiddleWares.checkError, GlobalMiddleWares_1.GlobalMiddleWares.auth, QuizController_1.QuizController.getQuizList);
        this.router.get("/getQuizLeaderBoard", GlobalMiddleWares_1.GlobalMiddleWares.checkError, GlobalMiddleWares_1.GlobalMiddleWares.auth, QuizController_1.QuizController.getQuizLeaderBoard);
    }
    postRoutes() {
        this.router.post("/createquiz", GlobalMiddleWares_1.GlobalMiddleWares.checkError, GlobalMiddleWares_1.GlobalMiddleWares.auth, QuizController_1.QuizController.createQuiz);
        // Quiz Questions
        this.router.post("/createquizquestion", GlobalMiddleWares_1.GlobalMiddleWares.checkError, GlobalMiddleWares_1.GlobalMiddleWares.auth, QuizController_1.QuizController.createQuizQuestion);
        this.router.post("/getquizquestionList", GlobalMiddleWares_1.GlobalMiddleWares.checkError, GlobalMiddleWares_1.GlobalMiddleWares.auth, QuizController_1.QuizController.getQuizQuestionList);
        this.router.post("/submitquizresult", GlobalMiddleWares_1.GlobalMiddleWares.checkError, GlobalMiddleWares_1.GlobalMiddleWares.auth, QuizController_1.QuizController.submitQuizResult);
    }
    putRoutes() {
    }
    deleteRoutes() { }
}
exports.default = new CustomerRouter().router;
