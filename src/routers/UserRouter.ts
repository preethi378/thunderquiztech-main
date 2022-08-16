import { Router } from "express";
import { UserController } from "../controllers/customer/UserController";

class UserRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() { 
      this.router.get("/", UserController.findAll);
     this.router.get("/:userID",  UserController.findOne);

  }

  postRoutes() {
    this.router.post( "/", UserController.create);
    

  }

  putRoutes() {
      this.router.put("/:userID",  UserController.update);

  }
  
    deleteRoutes() {
      this.router.delete("/:userID",  UserController.destroy);
  }
}

export default new UserRouter().router;

