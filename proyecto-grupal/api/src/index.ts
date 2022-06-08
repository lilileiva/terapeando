import mongoose from 'mongoose'

import express from 'express' // instale npm i @types/express -D como dependecia de desarrollo para que entienda modulos de express
const routes = require('./routes/index.ts')

// Database Connection

async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()


// server  inicializations

const app = express() 
app.set( 'port', process.env.PORT || 3000 )


// Middlewares

app.use(express.json()); // para que entienda el formato json

// routes

app.use('/', routes)

// starting server 

app.listen(app.get('port'), () => {
   console.log('server on port', app.get('port'))
});
