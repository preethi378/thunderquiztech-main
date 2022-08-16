"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const nodeMailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env_1 = require("../environments/env");
class Mailer {
    static initializeTransport() {
        let transporter = nodeMailer.createTransport((0, env_1.getEnvironmentVariables)().mailer_options);
        return transporter;
    }
    static sendEmail(data) {
        const myPath = path.join(__dirname, "..", "views", data.template);
        ejs.renderFile(myPath, Object.assign({}, data), (err, templateData) => {
            if (err) {
                return Promise.reject(err);
            }
            if (templateData) {
                Mailer.initializeTransport().sendMail({
                    from: "Demo Project",
                    to: data.to,
                    subject: data.subject,
                    text: data.text,
                    html: templateData,
                }, (error, info) => {
                    if (error) {
                        console.log("Problem in sending e-mail..");
                        console.log(error);
                        return Promise.reject(error);
                    }
                    console.log("Message %s sent: %s", info.messageId, info.response);
                    Promise.resolve({ messageId: info.messageId, response: info.response });
                });
            }
        });
    }
}
exports.Mailer = Mailer;
