"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const CustomerRouter_1 = require("./routers/CustomerRouter");
const QuizRouter_1 = require("./routers/QuizRouter");
const FrontEndRouter_1 = require("./routers/FrontEndRouter");
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        this.configureBodyparser();
        // this.configureSkipper();
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, './views'));
        this.app.use(express.static(path.resolve(__dirname, '../assets')));
    }
    // configureSkipper() {
    //     this.app.use(require("skipper")({
    //         strict: true,
    //         maxTimeToBuffer: 100000
    //     }));
    // }
    configureBodyparser() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.json());
    }
    configureEjs() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
    }
    configureSession() {
        const ss = {
            secret: 'my top secret',
            cookie: {},
            resave: false,
            saveUninitialized: true
        };
        if (process.env.NODE_ENV == "production") {
            this.app.set('trust proxy', 1); // trust first proxy
            //ss.cookie.secure = true // serve secure cookies
        }
        this.app.use(session(ss));
    }
    setRoutes() {
        this.app.use('/api/customer', CustomerRouter_1.default);
        this.app.use('/api/quiz', QuizRouter_1.default);
        this.app.use('/', FrontEndRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not found',
                status: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            if (errorStatus == 500 && process.env.NODE_ENV == "production")
                error.message = "Something went wrong. Please try again.";
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please try again.',
                status: errorStatus
            });
        });
    }
}
exports.Server = Server;
