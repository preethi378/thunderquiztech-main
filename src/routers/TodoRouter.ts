import { Router } from "express";
import { TodoController } from "../controllers/customer/TodoController";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { CustomerValidators } from "../validators/CustomerValidators";


class TodoRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    
  getRoutes() { 
    this.router.get( "/getAllTodo", TodoController.getAllTodo);
  }

  postRoutes() {
    this.router.post( "/create", TodoController.createTodo);    

  }

  putRoutes() {
    this.router.put( "/updateTodo", TodoController.updateTodo); 
  }
  
  deleteRoutes() {}
}

export default new TodoRouter().router;
