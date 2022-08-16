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
exports.CustomerController = void 0;
const Jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const env_1 = require("../../environments/env");
const bcrypt = require("bcrypt");
const models_1 = require("../../models");
const Mailer_1 = require("../../utils/Mailer");
const Utils_1 = require("../../utils/Utils");
class CustomerController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mobile, password } = req.body;
                const data = {
                    mobile: mobile
                };
                const customer = yield models_1.default.Customer.findOne({ where: { mobile: mobile, status: 1 }, raw: true });
                if (!customer) {
                    return res.status(404).json({
                        status: 404,
                        message: "Invalid mobile or password."
                    });
                }
                const hash = customer.password_hash;
                const match = yield bcrypt.compare(password, hash);
                if (match) {
                    var rank = yield Utils_1.Utils.GetRank(customer.id);
                    customer.rank = rank;
                    const token = yield Jwt.sign(data, (0, env_1.getEnvironmentVariables)().jwt_secret);
                    return res.status(200).json({
                        status: 200,
                        message: "Logged in successfully.",
                        token: token,
                        data: customer
                    });
                }
                return res.status(404).json({
                    status: 404,
                    message: "Invalid mobile or password."
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordHash = yield bcrypt.hash(req.body.password, 10);
                const data = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password_hash: passwordHash,
                    status: 1,
                };
                const result = yield models_1.default.Customer.findOne({ where: { mobile: data.mobile } });
                if (result) {
                    return res.status(404).json({
                        status: 404,
                        message: "Please try different mobile.",
                    });
                }
                let customer = yield models_1.default.Customer.create(data);
                customer = yield models_1.default.Customer.findOne({ attributes: ['email', 'first_name', 'last_name'], where: { email: data.email } });
                return res.status(200).json({
                    status: 200,
                    message: "Customer signed up successfully.",
                    data: customer
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    email: req.body.email,
                };
                const result = yield models_1.default.Customer.findOne({ where: { email: data.email } });
                if (!result) {
                    return res.status(404).json({
                        status: 404,
                        message: "User does not exists in system.",
                    });
                }
                const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                const response = yield Mailer_1.Mailer.sendEmail({
                    to: [data.email],
                    subject: "Verify OTP",
                    template: "../../src/views/email-templates/sendotp.ejs",
                    //template: "/../email-templates/sendotp.ejs",
                    data: {
                        otp: otp
                    }
                });
                console.log("Response after mailer: ", response);
                yield models_1.default.Otp.create({ otp: otp, expires_in_minute: 20, status: 0 }); // status=0, active.
                return res.status(200).json({
                    status: 200,
                    message: "Otp sent. Otp is valid for only 20 minutes. Please check your registered email.",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    email: req.body.email,
                    otp: req.body.otp,
                };
                const result = yield models_1.default.Otp.findOne({ where: { otp: data.otp, status: 0 } });
                if (!result) {
                    return res.status(404).json({
                        status: 404,
                        message: "Invalid Otp entered.",
                    });
                }
                const expirationTime = result.createdAt + (result.expires_in_minute * 60 * 1000);
                const currentTime = Date.now();
                if (currentTime > expirationTime) {
                    yield models_1.default.Otp.update({ status: 1 }, { where: { id: result.id } }); // expire otp in db
                    return res.status(404).json({
                        status: 404,
                        message: "Otp is expired.",
                    });
                }
                yield models_1.default.Otp.update({ status: 1 }, { where: { id: result.id } }); // expire otp in db
                const payload = {
                    otp: result.otp,
                    email: data.email
                };
                const token = yield Jwt.sign(payload, (0, env_1.getEnvironmentVariables)().jwt_secret, { expiresIn: 10 * 60 });
                return res.status(200).json({
                    status: 200,
                    message: "Otp verfied sucessfully.",
                    token: token,
                    message2: "Use given token to reset password. Expires in 10 mins"
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (!token) {
                    req.errorStatus = 401;
                    return next(new Error("Authorization token is missing."));
                }
                const payload = yield Jwt.verify(token, (0, env_1.getEnvironmentVariables)().jwt_secret);
                console.log(`Email: ${payload.email} is verified.`);
                const passwordHash = yield bcrypt.hash(req.body.password, 10);
                const email = req.body.email;
                const result = yield models_1.default.Customer.findOne({ where: { email: email } });
                if (!result) {
                    return res.status(404).json({
                        status: 404,
                        message: "User does not exists in system.",
                    });
                }
                yield models_1.default.Customer.update({ password_hash: passwordHash }, { where: { email: email } });
                return res.status(200).json({
                    status: 200,
                    message: "Password reset successful.",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield models_1.default.Customer.findOne({ attributes: ['email', 'first_name', 'last_name', 'mobile'], where: { email: email } });
                if (!user) {
                    req.errorStatus = 404;
                    return next(new Error("User does not exists in system."));
                }
                return res.status(200).json({
                    status: 200,
                    message: "User profile fetched.",
                    data: user,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            console.log(req.body);
            const passwordHash = yield bcrypt.hash(req.body.password, 10);
            const mobile = req.body.mobile;
            const result = yield models_1.default.Customer.findOne({ where: { mobile: mobile } });
            if (!result) {
                return res.status(404).json({
                    status: 404,
                    message: "User does not exists in system.",
                });
            }
            yield models_1.default.Customer.update({ password_hash: passwordHash }, { where: { mobile: mobile } });
            return res.status(200).json({
                status: 200,
                message: "Password reset successful.",
            });
            // }catch(err) {
            //   next(err);
            // }    
        });
    }
    static userVerification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mobile } = req.body;
                const user = yield models_1.default.Customer.findOne({ attributes: ['first_name', 'last_name', 'mobile'], where: { mobile: mobile } });
                if (!user) {
                    return res.status(200).json({
                        status: 200,
                        message: "User does not exists",
                        user_exists: 0,
                    });
                }
                return res.status(200).json({
                    status: 200,
                    message: "User exists.",
                    user_exists: 1,
                    data: user,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.default.Customer.findOne({ where: { mobile: req.body.usermobile }, raw: true });
                if (!result) {
                    return res.status(404).json({
                        status: 404,
                        message: "User does not exists in system.",
                    });
                }
                var updatedata = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    about_me: req.body.about_me,
                    lives_in: req.body.lives_in,
                    profile_pic_image_url: req.body.profile_pic_image_url,
                };
                yield models_1.default.Customer.update(updatedata, { where: { id: result.id } });
                return res.status(200).json({
                    status: 200,
                    message: "Profile successful updated.",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usermobile } = req.body;
                const user = yield models_1.default.Customer.findOne({ where: { mobile: usermobile }, raw: true });
                if (!user) {
                    req.errorStatus = 404;
                    return next(new Error("User does not exists in system."));
                }
                var rank = yield Utils_1.Utils.GetRank(user.id);
                user.rank = rank;
                return res.status(200).json({
                    status: 200,
                    message: "User profile fetched.",
                    data: user,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CustomerController = CustomerController;
