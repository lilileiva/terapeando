"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // instale npm i @types/express -D como dependecia de desarrollo para que entienda modulos de express
const morgan_1 = __importDefault(require("morgan"));
const routes = require('./routes/index.ts');
const cors = require('cors');
// server  inicializations
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 3001);
// Middlewares
app.use(cors());
app.use(express_1.default.json()); // para que entienda el formato json
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// routes
app.use('/', routes);
//Error Handler
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
};
app.use(errorHandler);
exports.default = app;
