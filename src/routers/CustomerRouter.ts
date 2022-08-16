import { Router } from "express";
import { CustomerController } from "../controllers/customer/CustomerController";
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
    this.router.get( "/userprofile", GlobalMiddleWares.checkError, GlobalMiddleWares.auth, CustomerController.getUserProfile);
  }

  postRoutes() {
    this.router.post( "/login", CustomerValidators.login(), GlobalMiddleWares.checkError, CustomerController.login);
    this.router.post( "/signup", CustomerValidators.signup(),  GlobalMiddleWares.checkError, CustomerController.signup);
    this.router.post( "/forgotPassword", CustomerController.forgotPassword);
    this.router.post( "/verifyotp", CustomerController.verifyOtp);
    this.router.post( "/resetpassword", CustomerController.resetPassword);

    this.router.post( "/updatepassword", CustomerController.updatePassword);
    this.router.post( "/userverification", CustomerController.userVerification);


    this.router.post( "/profile", CustomerValidators.getProfile(), GlobalMiddleWares.checkError, GlobalMiddleWares.auth, CustomerController.getProfile);
    

  }

  putRoutes() {
    this.router.put( "/updateprofile", GlobalMiddleWares.checkError, GlobalMiddleWares.auth, CustomerController.updateProfile); 
  }
  
  deleteRoutes() {}
}

export default new CustomerRouter().router;
