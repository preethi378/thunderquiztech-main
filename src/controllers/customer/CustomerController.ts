import * as express from 'express';
import * as Jwt from 'jsonwebtoken';
import * as otpGenerator from "otp-generator";
import { getEnvironmentVariables } from '../../environments/env';
import * as bcrypt from 'bcrypt';
import Model from '../../models';
import { Mailer } from '../../utils/Mailer';
import { Utils } from '../../utils/Utils';


export class CustomerController {

  static async login(req, res, next) {
    try {
      const { mobile, password } = req.body;

      const data = {
        mobile: mobile
      };

      const customer:any = await Model.Customer.findOne({ where: { mobile: mobile, status: 1 }, raw : true});

      if(!customer) {
        return res.status(404).json({
          status: 404,
          message: "Invalid mobile or password."
        });
      }

      const hash = customer.password_hash;
      const match = await bcrypt.compare(password, hash);
      if(match) {
        var rank = await Utils.GetRank(customer.id);
        customer.rank = rank;
        const token = await Jwt.sign(data, getEnvironmentVariables().jwt_secret);
        return res.status(200).json({
          status: 200,
          message: "Logged in successfully.",
          token: token,
          data : customer
        });
      }

      return res.status(404).json({
        status: 404,
        message: "Invalid mobile or password."
      });

    }catch(err) {
      next(err);
    }
  }

  static async signup(req, res, next) {
    try {

      const passwordHash = await bcrypt.hash(req.body.password, 10);

      const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        password_hash: passwordHash,
        status: 1,
      };

      const result = await Model.Customer.findOne({ where: { mobile: data.mobile } });

      if(result) {
        return res.status(404).json({
          status: 404,
          message: "Please try different mobile.",
        });        
      }

      let customer:any = await Model.Customer.create(data);
      customer = await Model.Customer.findOne({ attributes: ['email','first_name','last_name'], where: { email: data.email } });

      return res.status(200).json({
        status: 200,
        message: "Customer signed up successfully.",
        data: customer
      });

    }catch(err) {
      next(err);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const data = {
        email: req.body.email,
      };

      const result = await Model.Customer.findOne({ where: { email: data.email } });

      if(!result) {
        return res.status(404).json({
          status: 404,
          message: "User does not exists in system.",
        });        
      }

      const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

      const response = await Mailer.sendEmail({
        to: [data.email],
        subject: "Verify OTP",
        template : "../../src/views/email-templates/sendotp.ejs",
        //template: "/../email-templates/sendotp.ejs",
        data: {
          otp: otp
        }
      }); 
      console.log("Response after mailer: ", response);

      await Model.Otp.create({ otp: otp, expires_in_minute: 20, status: 0 }); // status=0, active.

      return res.status(200).json({
        status: 200,
        message: "Otp sent. Otp is valid for only 20 minutes. Please check your registered email.",
      });

    }catch(err) {
      next(err);
    }    
  }

  static async verifyOtp(req, res, next) {
    try {
      const data = {
        email: req.body.email,
        otp: req.body.otp,
      };

      const result:any = await Model.Otp.findOne({ where: { otp: data.otp, status: 0 } });

      if(!result) {
        return res.status(404).json({
          status: 404,
          message: "Invalid Otp entered.",
        });
      }

      const expirationTime = result.createdAt + (result.expires_in_minute*60*1000) ;
      const currentTime = Date.now();
      if(currentTime > expirationTime) {
        await Model.Otp.update({ status: 1 }, { where: { id: result.id } }); // expire otp in db
        return res.status(404).json({
          status: 404,
          message: "Otp is expired.",
        });
      }

      await Model.Otp.update({ status: 1 }, { where: { id: result.id } }); // expire otp in db

      const payload = {
        otp: result.otp,
        email: data.email
      };
      const token = await Jwt.sign(payload, getEnvironmentVariables().jwt_secret, { expiresIn: 10*60 });

      return res.status(200).json({
        status: 200,
        message: "Otp verfied sucessfully.",
        token: token,
        message2: "Use given token to reset password. Expires in 10 mins"
      });

    }catch(err) {
      next(err);
    }    
  }

  static async resetPassword(req, res, next) {
    try {

      const token = req.headers.authorization;
      if(!token) {
        req.errorStatus = 401;
        return next(new Error("Authorization token is missing."));
      }
      const payload:any = await Jwt.verify(token, getEnvironmentVariables().jwt_secret);
      console.log(`Email: ${payload.email} is verified.`);

      const passwordHash = await bcrypt.hash(req.body.password, 10);      
      const email = req.body.email;
      
      const result = await Model.Customer.findOne({ where: { email: email } });

      if(!result) {
        return res.status(404).json({
          status: 404,
          message: "User does not exists in system.",
        });        
      }

      await Model.Customer.update({ password_hash: passwordHash }, { where: { email: email } });

      return res.status(200).json({
        status: 200,
        message: "Password reset successful.",
      });

    }catch(err) {
      next(err);
    }    
  }

  static async getProfile(req, res, next) {
    try {
      const {email} = req.body;

      const user = await Model.Customer.findOne({ attributes: ['email','first_name','last_name','mobile'], where: { email: email } })

      if(!user) {
        req.errorStatus = 404;
        return next(new Error("User does not exists in system."));
      }

      return res.status(200).json({
        status: 200,
        message: "User profile fetched.",
        data: user,
      });

    } catch (error) {
      next(error);
    }
  }


  static async updatePassword(req, res, next) {
    // try {
      console.log(req.body)
      const passwordHash = await bcrypt.hash(req.body.password, 10);      
      const mobile = req.body.mobile;
      
      const result = await Model.Customer.findOne({ where: { mobile: mobile } });

      if(!result) {
        return res.status(404).json({
          status: 404,
          message: "User does not exists in system.",
        });        
      }

      await Model.Customer.update({ password_hash: passwordHash }, { where: { mobile: mobile } });

      return res.status(200).json({
        status: 200,
        message: "Password reset successful.",
      });

    // }catch(err) {
    //   next(err);
    // }    
  }


  
  static async userVerification(req, res, next) {
    try {
      const {mobile} = req.body;

      const user = await Model.Customer.findOne({ attributes: ['first_name','last_name','mobile'], where: { mobile: mobile } })

      if(!user) {
        return res.status(200).json({
          status: 200,
          message: "User does not exists",
          user_exists: 0,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "User exists.",
        user_exists : 1,
        data: user,
      });

    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {      
      const result:any = await Model.Customer.findOne({ where: { mobile: req.body.usermobile }, raw : true });

      if(!result) {
        return res.status(404).json({
          status: 404,
          message: "User does not exists in system.",
        });        
      }

      var updatedata = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        dob : req.body.dob,
        gender : req.body.gender,
        about_me : req.body.about_me,
        lives_in : req.body.lives_in,
        profile_pic_image_url : req.body.profile_pic_image_url,
      }

      await Model.Customer.update(updatedata, { where: { id: result.id  } });

      return res.status(200).json({
        status: 200,
        message: "Profile successful updated.",
      });

    }catch(err) {
      next(err);
    }    
  }

  static async getUserProfile(req, res, next) {
    try {
      const {usermobile} = req.body;

      const user:any = await Model.Customer.findOne({ where: { mobile: usermobile }, raw : true });

      if(!user) {
        req.errorStatus = 404;
        return next(new Error("User does not exists in system."));
      }

      var rank = await Utils.GetRank(user.id);
      user.rank = rank;

      return res.status(200).json({
        status: 200,
        message: "User profile fetched.",
        data: user,
      });

    } catch (error) {
      next(error);
    }
  }


}
