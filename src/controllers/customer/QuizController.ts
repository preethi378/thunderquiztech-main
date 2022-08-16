import * as express from 'express';
import { Sequelize } from "sequelize";
import * as Jwt from 'jsonwebtoken';
import * as otpGenerator from "otp-generator";
import { getEnvironmentVariables } from '../../environments/env';
import * as bcrypt from 'bcrypt';
import Model from '../../models';
import { Mailer } from '../../utils/Mailer';
import { QuizQuestion } from '../../models/quizquestion';

export class QuizController {
  
    static async getQuizList(req, res, next) {
        try {
          const {usermobile} = req.body;

          const tsetting:any = await Model.ThunderQuizTechSetting.findOne( { where: { status: 1 } } )
    
          const quizlist:any = await Model.Quiz.findAll( { raw : true} )
    
          if(!quizlist) {
            req.errorStatus = 404;
            return next(new Error("Quiz List Not available"));
          }
    
          for (let i = 0; i < quizlist.length; i++) {
            quizlist[i].total_time_allocated = parseInt(tsetting.quiz_no_of_question) * parseInt(tsetting.per_question_time);
            quizlist[i].total_questions = tsetting.quiz_no_of_question;
          }

          return res.status(200).json({
            status: 200,
            message: "Quiz List fetched.",
            data: quizlist,
          });
    
        } catch (error) {
          next(error);
        }
    }

    static async createQuiz(req, res, next) {
        try {
    
         
          const data = req.body;
    
          const result = await Model.Quiz.findOne({ where: { quiz_name: data.quiz_name } });
    
          if(result) {
            return res.status(404).json({
              status: 404,
              message: "Already Added",
            });        
          }
    
          let quiz:any = await Model.Quiz.create(data);
          
          return res.status(200).json({
            status: 200,
            message: "Quiz Created successfully.",
            data: quiz
          });
    
        }catch(err) {
          next(err);
        }
    }

    static async createQuizQuestion(req, res, next) {
        try {
    
         
          const data = req.body;
    
          const result = await Model.QuizQuestion.findOne({ where: { question: data.question, quizid : data.quizid } });
    
          if(result) {
            return res.status(404).json({
              status: 404,
              message: "Already Added",
            });        
          }
    
          let quizquestion:any = await Model.QuizQuestion.create(data);
          
          return res.status(200).json({
            status: 200,
            message: "Quiz Question Created successfully.",
            data: quizquestion
          });
    
        }catch(err) {
          next(err);
        }
    }

    static async getQuizQuestionList(req, res, next) {
        try {
          const quiz = req.body;
          const tsetting:any = await Model.ThunderQuizTechSetting.findOne( { where: { status: 1 } } )

          const quizquestionlist = await Model.QuizQuestion.findAll({ 
            where : {quizid : quiz.quizid },
            order : Sequelize.literal('rand()'),
            limit : tsetting.quiz_no_of_question
          })
    
          if(!quizquestionlist) {
            req.errorStatus = 404;
            return next(new Error("Quiz Questions Not available"));
          }
    
          return res.status(200).json({
            status: 200,
            message: "Quiz Question fetched.",
            data: quizquestionlist,
          });
    
        } catch (error) {
          next(error);
        }
    }

    static async submitQuizResult(req, res, next) {
      try {
  
       
        const data = req.body;
        const user:any = await Model.Customer.findOne({ where: { mobile: data.usermobile }, raw : true });
        if(!user) {
          req.errorStatus = 404;
          return next(new Error("User does not exists in system."));
        }
        var resultdata = {
          userid : user.id,
          quizid : data.quizid,
          total_questions : data.total_questions,
          correct_ans : data.correct_answer,
          incorrect_ans : data.incorrect_answer,
          questions_skipped : data.questions_skipped,
          quiz_duration : data.quiz_duration,
          status : 0
        }

        const result = await Model.QuizResult.create(resultdata);
  
        if(!result) {
          req.errorStatus = 404;
          return next(new Error("Quiz Result Not Submitted"));     
        } 

        var games_won = user.games_won;
        var hightest_score = user.hightest_score;
        var correct_answers = parseInt(user.correct_answers) + parseInt(data.correct_answer);
        var xp_gained = parseInt(user.xp_gained) + (data.correct_answer * 10);

        if(data.correct_answer == data.total_questions){
          games_won = games_won + 1;
        }

        if( hightest_score < (data.correct_answer * 10)){
          console.log("heighest score")
          console.log(hightest_score)
          hightest_score = data.correct_answer * 10
        }


        var updatestatsdata = {
          games_won : games_won,
          hightest_score : hightest_score,
          correct_answers : correct_answers,
          xp_gained : xp_gained
        }
        await Model.Customer.update(updatestatsdata, { where: { id: user.id  } });
        
        return res.status(200).json({
          status: 200,
          message: "Quiz Result Submitted successfully.",
          data: result
        });
  
      }catch(err) {
        next(err);
      }
  }

  static async getQuizLeaderBoard(req, res, next) {
    try {
      const quiz = req.body;
      const leaderboarddata = await Model.Customer.findAll({
        where: {},
        order: [['xp_gained', 'DESC']],
        raw: true
      }

      )

      if(!leaderboarddata) {
        req.errorStatus = 404;
        return next(new Error("Data Not available"));
      }

      return res.status(200).json({
        status: 200,
        message: "Leader Board fetched.",
        data: leaderboarddata,
      });

    } catch (error) {
      next(error);
    }
}

}