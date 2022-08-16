import * as express from 'express';
import { getEnvironmentVariables } from '../../environments/env';
import { v4 as uuidv4 } from "uuid";
import Model from '../../models';


export class TodosController {

    static async create(req, res, next) {
        try {
            
            const id = uuidv4();
            let result: any = await Model.Todo.create({ ...req.body, id });
      
            return res.status(200).json({
                status: 200,
                message: "Records Created successfully.",
                data: result
            });

        } catch (err) {
            next(err);
        }
    }
    static async readPagination(req, res, next) {
        try {
            const limit = (req.query.limit as number | undefined) || 10;
            const offset = req.query.offset as number | undefined;

            const result = await Model.Todo.findAll({
                where: {},
                limit,
                offset
            })
    
            return res.status(200).json({
                status: 200,
                message: "Records fetched.",
                data: result,
            });
    
        } catch (error) {
            next(error);
        }
    }
    static async readByID(req, res, next) {
        try {
            const { id } = req.params;

            const result = await Model.Todo.findOne({
                where: { id }
            })
    
            return res.status(200).json({
                status: 200,
                message: "Records fetched.",
                data: result,
            });
    
        } catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            console.log(req.body)
            const { id } = req.params;
            const { completed } = req.body.completed;
            const result = await Model.Todo.findOne({ where: { id } });
    
            if (!result) {
                return res.status(404).json({
                    status: 404,
                    message: "Records does not exists in system.",
                });
            }
    
          await Model.Todo.update({ completed: completed }, { where: { id: id } });
    
            return res.status(200).json({
                status: 200,
                message: "Records update successful.",
                data: result
            });
        } catch (error) {
            next(error);
        }

    }
    static async delete(req, res, next) {
        try {
            const { id } = req.params;

            const result = await Model.Todo.findOne({ where: { id } });
    
            if (!result) {
                return res.status(404).json({
                    status: 404,
                    message: "Records does not exists in system.",
                });
            }
    
            await Model.Todo.destroy();
    
            return res.status(200).json({
                status: 200,
                message: "Records delete successful.",
                data: result
            });
        } catch (error) {
            next(error);
        }

    }
}