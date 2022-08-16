import { Router } from "express";
import { TodosController } from "../controllers/customer/TodosController";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { TodoValidators } from "../validators/TodoValidators";

class TodosRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() { 
      this.router.get("/read",  TodoValidators.checkReadTodo(),  GlobalMiddleWares.handleValidationError, TodosController.readPagination);
      this.router.get( "/read/:id",  TodoValidators.checkIdParam(),  GlobalMiddleWares.handleValidationError, TodosController.readByID);

  }

  postRoutes() {
    this.router.post( "/create",  	TodoValidators.checkCreateTodo(), GlobalMiddleWares.handleValidationError,  TodosController.create);
   

  
  }

  putRoutes() {
    this.router.put( "/update/:id", TodoValidators.checkIdParam(),  GlobalMiddleWares.handleValidationError, TodosController.update); 
  }
  
    deleteRoutes() {
        this.router.delete( "/delete/:id", TodoValidators.checkIdParam(),   GlobalMiddleWares.handleValidationError, TodosController.delete); 
  }
}

export default new TodosRouter().router;
