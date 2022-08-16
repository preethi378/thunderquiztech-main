"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerValidators = void 0;
const express_validator_1 = require("express-validator");
class CustomerValidators {
    static login() {
        return [
            (0, express_validator_1.body)('mobile', 'Please enter valid Mobile').isString(),
            (0, express_validator_1.body)('password', 'Please enter valid Password').isString(),
        ];
    }
    static signup() {
        return [
            // body('email', 'Please enter valid Email').isEmail(),
            (0, express_validator_1.body)('first_name', 'Please enter valid First name').isString(),
            (0, express_validator_1.body)('last_name', 'Please enter valid Last name').isString(),
            (0, express_validator_1.body)('mobile', 'Please enter valid Mobile').isString(),
            (0, express_validator_1.body)('password', 'Please enter valid Password').isString(),
        ];
    }
    static getProfile() {
        return [
            (0, express_validator_1.body)('email', 'Please enter valid Email').isEmail(),
            (0, express_validator_1.header)('authorization', 'Please enter valid authorization token').isString(),
        ];
    }
}
exports.CustomerValidators = CustomerValidators;
