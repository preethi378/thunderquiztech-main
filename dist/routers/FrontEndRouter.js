"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FrontEndController_1 = require("../controllers/frontend/FrontEndController");
class FrontEndRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get("/privacypolicy", FrontEndController_1.FrontEndController.privacyandpolicy);
        this.router.get("/termsandcondition", FrontEndController_1.FrontEndController.termsandconditions);
    }
    postRoutes() {
    }
    putRoutes() {
    }
    deleteRoutes() { }
}
exports.default = new FrontEndRouter().router;
