import * as nodeMailer from "nodemailer";
import * as ejs from "ejs";
import * as path from "path";

import { getEnvironmentVariables } from '../environments/env';

export class Mailer {
  private static initializeTransport() {
    let transporter = nodeMailer.createTransport(getEnvironmentVariables().mailer_options);
    return transporter;
  }

  static sendEmail(data: {
    to: [string];
    subject: string;
    text?: string;
    data?: any;
    template?: string;
  }) {
      const myPath =  path.join(__dirname, "..", "views", data.template );
      ejs.renderFile(myPath, { ...data }, (err, templateData) => {
        if(err) {
          return Promise.reject(err);
        }
        if(templateData) {
          Mailer.initializeTransport().sendMail(
              {
                from: "Demo Project",
                to: data.to, // list of receivers
                subject: data.subject,
                text: data.text, // plain text bdy
                html: templateData,
              },
              (error, info) => {
                if (error) {
                  console.log("Problem in sending e-mail..");
                  console.log(error);
                  return Promise.reject(error);
                }
                console.log("Message %s sent: %s", info.messageId, info.response);
                Promise.resolve({ messageId: info.messageId, response: info.response });
              }
          );
        }
      });      
  }
}
