import { Router } from "express";
import { PostController } from "../controllers/customer/PostController";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { CustomerValidators } from "../validators/CustomerValidators";


class PostRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    
  getRoutes() { 
    this.router.get( "/getPosts", PostController.getPosts);
  }

  postRoutes() {
    this.router.post( "/createPosts", PostController.createPosts);    

  }

  putRoutes() {
    this.router.put( "/updatePosts", PostController.updatePosts); 
  }
  
    deleteRoutes() {
        this.router.delete( "/deletePosts", PostController.deletePosts); 

      
  }
}

export default new PostRouter().router;
