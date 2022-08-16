"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMiddleWares = void 0;
const express_validator_1 = require("express-validator");
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
class GlobalMiddleWares {
    static checkError(req, res, next) {
        const error = (0, express_validator_1.validationResult)(req);
        console.log(error);
        if (!error.isEmpty()) {
            req.errorStatus = 400;
            next(new Error(`${error.array()[0].msg}, Param: ${error.array()[0].param}`));
        }
        else {
            next();
        }
    }
    static auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (!token) {
                    req.errorStatus = 401;
                    return next(new Error("Authorization token is missing."));
                }
                const payload = yield Jwt.verify(token, (0, env_1.getEnvironmentVariables)().jwt_secret);
                req.payload = payload;
                req.body.usermobile = req.payload.mobile;
                console.log("Payload");
                console.log(payload);
                console.log("Payload");
                next();
            }
            catch (err) {
                req.errorStatus = 401;
                next(err);
            }
        });
    }
    static identifyClient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.params.token;
                if (!token) {
                    req.errorStatus = 404;
                    return next(new Error("Invalid url."));
                }
                const payload = yield Jwt.verify(token, (0, env_1.getEnvironmentVariables)().jwt_secret);
                req.foundClient = payload;
                next();
            }
            catch (err) {
                req.errorStatus = 404;
                next(err);
            }
        });
    }
    static checkAdminSession(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = req.session.adminUser;
                if (!adminUser) {
                    req.errorStatus = 401;
                    throw new Error("Unauthorized.");
                }
                next();
            }
            catch (err) {
                req.errorStatus = 401;
                res.redirect("/auth/login");
            }
        });
    }
}
exports.GlobalMiddleWares = GlobalMiddleWares;
