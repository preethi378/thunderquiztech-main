import { Router } from "express";
import { QuizController } from "../controllers/customer/QuizController";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { CustomerValidators } from "../validators/CustomerValidators";

class CustomerRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() { 
    this.router.get( "/getquizlist", GlobalMiddleWares.checkError, GlobalMiddleWares.auth, QuizController.getQuizList);
    this.router.get( "/getQuizLeaderBoard", GlobalMiddleWares.checkError, GlobalMiddleWares.auth, QuizController.getQuizLeaderBoard);

  }

  postRoutes() {
    this.router.post( "/createquiz", GlobalMiddleWares.checkError, GlobalMiddleWares.auth, QuizController.createQuiz);
    
    // Quiz Questions
    this.router.post( "/createquizquestion", GlobalMiddleWares.checkError, GlobalMiddleWares.auth, QuizController.createQuizQuestion);
    this.router.post( "/getquizquestionList", GlobalMiddleWares.checkError, GlobalMiddleWares.auth, QuizController.getQuizQuestionList);

    this.router.post( "/submitquizresult", GlobalMiddleWares.checkError, GlobalMiddleWares.auth, QuizController.submitQuizResult);
  }

  putRoutes() {

  }
  
  deleteRoutes() {}
}

export default new CustomerRouter().router;
