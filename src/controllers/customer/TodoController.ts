import * as express from 'express';
import { getEnvironmentVariables } from '../../environments/env';
import Model from '../../models';


export class TodoController {

    static async createTodo(req, res, next) {
      
        try {
            const data = {
                book_name: req.body.book_name,
                price: req.body.price,
                author: req.body.author,
                title: req.body.title,
                

            };
        const result = await Model.Todos.findOne({ where: { author: data.author } });

            if (result) {
                return res.status(404).json({
                    status: 404,
                    message: "Please try different author.",
                });
            }

            let todoq: any = await Model.Todos.create(data);
            todoq = await Model.Todos.findOne({ attributes: ['book_name', 'price', 'author', 'title'], where: { title: data.title } });

            return res.status(200).json({
                status: 200,
                message: "Book Todo created successfully.",
                data: todoq
            });
            
        } catch (err) {
            next(err);
        }
    }

    static async getAllTodo(req, res, next) {
        try {
             // const todoq = req.body;
            const bdata = await Model.Todos.findAll()
      
            if (!bdata) {
                req.errorStatus = 404;
                return next(new Error("Data Not available"));
            }
      
            return res.status(200).json({
                status: 200,
                message: "Book data fetched.",
                data: bdata,
            });
        } catch (error) {
            next(error);
        }
    }
  
    static async updateTodo(req, res, next) {
        try {
            const result: any = await Model.Todos.findOne({ where: { author: req.body.usauthor }, raw: true });
            if (!result) {
                return res.status(404).json({
                    status: 404,
                    message: "author does not exists in system.",
                });
                
            }
            var updatedata = {
                book_name: req.body.book_name,
                price: req.body.price,
                title: req.body.title,
               
            }
            await Model.Todos.update(updatedata, { where: { id: result.id } });

            return res.status(200).json({
                status: 200,
                message: "Todo book successful updated.",
            });

        }
        catch (err) {
            next(err);
        }


    }
}
 






