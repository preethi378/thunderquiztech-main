import { Router } from "express";
import { QuizController } from "../controllers/customer/QuizController";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { CustomerValidators } from "../validators/CustomerValidators";
import { FrontEndController } from "../controllers/frontend/FrontEndController";

class FrontEndRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() { 
        this.router.get( "/privacypolicy", FrontEndController.privacyandpolicy);
        this.router.get( "/termsandcondition", FrontEndController.termsandconditions);

    }

    postRoutes() {
    
    }

    putRoutes() {

    }
  
    deleteRoutes() {}
}

export default new FrontEndRouter().router;
