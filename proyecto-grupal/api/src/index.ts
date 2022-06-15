import mongoose from 'mongoose'
import express from 'express' // instale npm i @types/express -D como dependecia de desarrollo para que entienda modulos de express
import morgan from 'morgan'
const routes = require('./routes/index.ts')
const cors = require('cors')

// Database Connection

async function connectDB() {
   try{
      // const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
      const db = await mongoose.connect('mongodb://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal-shard-00-00.z5mrv.mongodb.net:27017,proyectogrupal-shard-00-01.z5mrv.mongodb.net:27017,proyectogrupal-shard-00-02.z5mrv.mongodb.net:27017/ProyectoGrupaltest?ssl=true&replicaSet=atlas-xq3ym6-shard-0&authSource=admin&retryWrites=true&w=majority')
      console.log('database is connected to', db.connection.db.databaseName)
   }catch(e){
      console.log(e)
   }
}

connectDB()

// server  inicializations
const app = express() 
app.set( 'port', process.env.PORT || 3001 )

// Middlewares

app.use(express.json()); // para que entienda el formato json
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended:false}))
// routes

app.use('/', routes)

// starting server 

app.listen(app.get('port'), () => {
   console.log('server on port', app.get('port'))
});
