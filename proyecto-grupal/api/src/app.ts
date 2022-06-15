import express from 'express' // instale npm i @types/express -D como dependecia de desarrollo para que entienda modulos de express
import morgan from 'morgan'
const routes = require('./routes/index.ts')
const cors = require('cors')

require('dotenv').config();
const { MONGODB_URI } = process.env

// server  inicializations
const app = express() 
// app.set( 'port', process.env.PORT || 3001 )
app.set( 'port', MONGODB_URI || 3001 )


// Middlewares
app.use(express.json()); // para que entienda el formato json
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended:false}))

// routes
app.use('/', routes)

export default app