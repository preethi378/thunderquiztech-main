import { Sequelize } from "sequelize";
import { getEnvironmentVariables } from "../environments/env";
import { Customer } from "./customer";
import { Otp } from "./otp";
import { Quiz } from "./quiz";
import { QuizQuestion } from "./quizquestion";
import { QuizResult } from "./quizresult";
import { ThunderQuizTechSetting } from "./thunderquiztechsetting";
import { Todos } from "./todos";
import { Posts } from "./posts";
import { Todo } from "./todo";
import { Users } from "./users";



let dbOptions = getEnvironmentVariables().db_options;
var sequelize = new Sequelize(dbOptions.db, dbOptions.username, dbOptions.password, {
    host: dbOptions.host,
    dialect: 'mysql'
});
sequelize.authenticate().then((success)=> console.log('connected')).catch((err) => console.log('problem in connecting to sequelize:', err));

const Model = {
    Customer: Customer.init(sequelize),
    Otp: Otp.init(sequelize),
    Quiz: Quiz.init(sequelize),
    QuizQuestion : QuizQuestion.init(sequelize),
    QuizResult : QuizResult.init(sequelize),
    ThunderQuizTechSetting: ThunderQuizTechSetting.init(sequelize),
    Todos: Todos.init(sequelize),
    Posts: Posts.init(sequelize),
    Todo: Todo.init(sequelize),
    Users: Users.init(sequelize)
    

}

export default Model;