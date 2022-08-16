"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomerController_1 = require("../controllers/customer/CustomerController");
const GlobalMiddleWares_1 = require("../middlewares/GlobalMiddleWares");
const CustomerValidators_1 = require("../validators/CustomerValidators");
class CustomerRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get("/userprofile", GlobalMiddleWares_1.GlobalMiddleWares.checkError, GlobalMiddleWares_1.GlobalMiddleWares.auth, CustomerController_1.CustomerController.getUserProfile);
    }
    postRoutes() {
        this.router.post("/login", CustomerValidators_1.CustomerValidators.login(), GlobalMiddleWares_1.GlobalMiddleWares.checkError, CustomerController_1.CustomerController.login);
        this.router.post("/signup", CustomerValidators_1.CustomerValidators.signup(), GlobalMiddleWares_1.GlobalMiddleWares.checkError, CustomerController_1.CustomerController.signup);
        this.router.post("/forgotPassword", CustomerController_1.CustomerController.forgotPassword);
        this.router.post("/verifyotp", CustomerController_1.CustomerController.verifyOtp);
        this.router.post("/resetpassword", CustomerController_1.CustomerController.resetPassword);
        this.router.post("/updatepassword", CustomerController_1.CustomerController.updatePassword);
        this.router.post("/userverification", CustomerController_1.CustomerController.userVerification);
        this.router.post("/profile", CustomerValidators_1.CustomerValidators.getProfile(), GlobalMiddleWares_1.GlobalMiddleWares.checkError, GlobalMiddleWares_1.GlobalMiddleWares.auth, CustomerController_1.CustomerController.getProfile);
    }
    putRoutes() {
        this.router.put("/updateprofile", GlobalMiddleWares_1.GlobalMiddleWares.checkError, GlobalMiddleWares_1.GlobalMiddleWares.auth, CustomerController_1.CustomerController.updateProfile);
    }
    deleteRoutes() { }
}
exports.default = new CustomerRouter().router;
