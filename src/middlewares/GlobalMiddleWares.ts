import { validationResult } from "express-validator";
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariables } from "../environments/env";

export class GlobalMiddleWares {
  static checkError(req, res, next) {
    const error = validationResult(req);
    console.log(error);

    if (!error.isEmpty()) {
      req.errorStatus = 400;
      next(
        new Error(`${error.array()[0].msg}, Param: ${error.array()[0].param}`)
      );
    } else {
      next();
    }
  }

  static async auth(req, res, next) {
    try {
      const token = req.headers.authorization;
      if(!token) {
        req.errorStatus = 401;
        return next(new Error("Authorization token is missing."));
      }
      const payload = await Jwt.verify(token, getEnvironmentVariables().jwt_secret);
      req.payload = payload;
      req.body.usermobile = req.payload.mobile;
      console.log("Payload")
      console.log(payload);
      console.log("Payload")

      next();
    }catch(err) {
      req.errorStatus = 401;
      next(err);
    }
  }

  static async identifyClient(req, res, next) {
    try {
      const token = req.params.token;
      if(!token) {
        req.errorStatus = 404;
        return next(new Error("Invalid url."));
      }
      const payload = await Jwt.verify(token, getEnvironmentVariables().jwt_secret);
      req.foundClient = payload;
      next();
    }catch(err) {
      req.errorStatus = 404;
      next(err);
    }
  }

  static async checkAdminSession(req, res, next) {
    try {
      const adminUser = req.session.adminUser;
      if(!adminUser) {
        req.errorStatus = 401;
        throw new Error("Unauthorized.");
      }
      next();
    }catch(err) {
      req.errorStatus = 401;
      res.redirect("/auth/login");
    }
  }
  
  static async handleValidationError(req, res, next) {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.json(error.array()[0]);
		}
		next();
	}
}
