import * as express from 'express';
import * as Jwt from 'jsonwebtoken';
import * as otpGenerator from "otp-generator";
import { getEnvironmentVariables } from '../../environments/env';
//import * as bcrypt from 'bcrypt';
import Model from '../../models';
import { Mailer } from '../../utils/Mailer';
import { Utils } from '../../utils/Utils';


export class FrontEndController {
    static async privacyandpolicy(req, res, next) {
      return res.render('pages/privacyandpolicy', { layout: false });
    }

    static async termsandconditions(req, res, next) {
        return res.render('pages/termsandcondition', { layout: false });
    }
}