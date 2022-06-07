import { getDiscriminatorModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import userClientModel from './models/userClients'
import postModel from './models/Post'
//testasasaas
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

// async function testQuery(){
//    const testUser =  new userClientModel({
//       firstName: 'Saul1',
//          lastName: 'Goodman1',
//          email: 'Saul1@gmail.com',
//          password: 'asasdaddjis',
//          birthDate: '15/04/89',
//          country: 'US'
//    })
//    await testUser.save()
//    console.log("se creo el usuario"+testUser)
// } 

// testQuery()