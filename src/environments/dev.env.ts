import { Environment } from "./env";

export const DevEnvironment: Environment = {
  db_options: {
    username: "root",
    password: " ",
    host: "localhost",
    db: "thunderquiztech",
  },
  img_base_url: '',
  jwt_secret: 'DEV_SECRET',
  jwt_expires_in: '30d',
  imageUploadPath: './src/public/uploads',
  mailer_options: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "shubh.singh.it@gmail.com",
      pass: "9111883489",
    },
  },
  base_url: "http://localhost:3000"
};
