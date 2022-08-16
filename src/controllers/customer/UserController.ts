
import * as express from 'express';
import { Sequelize } from "sequelize";
import { getEnvironmentVariables } from '../../environments/env';

import Model from '../../models';

export class UserController {
   
  static  async findAll(req, res, next) {
        const myuser = await Model.Users.findAll();
        return myuser.length > 0 ? res.status(200).json(myuser) : res.status(204).send();
        
    }
   static async findOne(req, res, next) {
        const { userId } = req.params;
        const myuser = await Model.Users.findOne({
            where: {
                id: userId,
            },
        });

        return myuser ? res.status(200).json(myuser) : res.status(204).send();
    }

   static async create(req, res,next) {
        const { email, none, idade } = req.body;
        const myuser = await Model.Users.create({
            email,
            none,
            idade
        });
        return res.status(201).json(myuser);
        
    }
   static async update(req, res, next) {
        //const { email, none, idade } = req.body;
           const { userId } = req.params;
   
           await Model.Users.update(req.body, { where: { id: userId } });
           return res.status(204).send();
           
       }
      static async destroy(req, res, next) {
           const { userId } = req.params;
           await Model.Users.destroy({ where: { id: userId } });
           return res.status(204).send();
           
       }


}