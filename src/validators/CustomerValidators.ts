import { body, header, param } from 'express-validator';

export class CustomerValidators {
    static login() {
        return [
            body('mobile', 'Please enter valid Mobile').isString(),
            body('password', 'Please enter valid Password').isString(),
        ];
    }
    
    static signup() {
        return [
            // body('email', 'Please enter valid Email').isEmail(),
            body('first_name', 'Please enter valid First name').isString(),
            body('last_name', 'Please enter valid Last name').isString(),
            body('mobile', 'Please enter valid Mobile').isString(),
            body('password', 'Please enter valid Password').isString(),
        ];
    }

    static getProfile() {
        return [
            body('email', 'Please enter valid Email').isEmail(),
            header('authorization', 'Please enter valid authorization token').isString(),
        ];
    }
    
}