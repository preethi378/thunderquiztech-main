import * as express from 'express';
import { getEnvironmentVariables } from '../../environments/env';
import Model from '../../models';


export class PostController {

   

    static async getPosts(req, res, next) {
        try {
            const bdata = await Model.Posts.findAll()
      
            if (!bdata) {
                req.errorStatus = 404;
                return next(new Error("Data Not available"));
            }
      
            return res.status(200).json({
                status: 200,
                message: "Post data fetched.",
                data: bdata,
            });
        } catch (error) {
            next(error);
        }
    }
    static async createPosts(req, res, next) {
        try {
    
         
          const data = req.body;
    
          const result = await Model.Posts.findOne({ where: { description: data.description, postid : data.postid } });
    
          if(result) {
            return res.status(404).json({
              status: 404,
              message: "Already Added",
            });        
          }
    
          let postsc:any = await Model.Posts.create(data);
          
          return res.status(200).json({
            status: 200,
            message: "Post Created successfully.",
            data: postsc
          });
    
        }catch(err) {
          next(err);
        }
    }

    static async updatePosts(req, res, next) {
        try {      
          const result:any = await Model.Posts.findOne({ where: { description: req.body.description }, raw : true });
    
          if(!result) {
            return res.status(404).json({
              status: 404,
              message: "post does not exists in system.",
            });        
          }
    
          var updatedata = {
            title: req.body.title,
            description : req.body.description,
            image_url : req.body.image_url,
            
          }
    
          await Model.Posts.update(updatedata, { where: { postid: result.postid  } });
    
          return res.status(200).json({
            status: 200,
            message: "Post successful updated.",
          });
    
        }catch(err) {
          next(err);
        }    
      }
      static async deletePosts(req, res, next) {
          try {      
              const postid = req.params.postid;
          const deletePost:any = await Model.Posts.findByPk(postid);
    
          if(!deletePost) {
            return res.status(404).json({
              status: 404,
              message: "post does not exists in system.",
            });        
          }
          await Model.Posts.destroy({ where: { postid  } });
    
          return res.status(200).json({
            status: 200,
              message: "Post successful deleted.",
              data: deletePost,
          });
    
        }catch(err) {
          next(err);
        }    
      }
    
  
  
   
}
 