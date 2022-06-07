import { getDiscriminatorModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import userClientModel from './models/userClients'
import postModel from './models/Post'

async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()
async function testeQuery(){
   const post = new postModel({
      Date:"2022-03-13",
      Title:"Transtorno Depresivo",
      Content:"este es el cotenido",
      Image:"esta es la imagen",
      Tags: ["depresion","cronica"],
      idUserPsychologist:"629f99e7de87372b776f79ed",
   })
   await post.save()
   console.log(post)
}
testeQuery()
