import mongoose from 'mongoose'
import userClientModel from './models/userClients'
import postModel from './models/Post'
import userPsychologistModel from './models/userPsychologist'

async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()

