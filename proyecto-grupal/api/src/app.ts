import express from 'express' // instale npm i @types/express -D como dependecia de desarrollo para que entienda modulos de express
import { Request, Response, NextFunction, ErrorRequestHandler} from "express";
import morgan from 'morgan'
const routes = require('./routes/index.ts')
const cors = require('cors')


// server  inicializations
const app = express() 
app.set( 'port', process.env.PORT || 3001 )

// Middlewares
app.use(cors())
app.use(express.json()); // para que entienda el formato json
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

// routes
app.use('/', routes)

//Error Handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
};
app.use(errorHandler);

export default app
