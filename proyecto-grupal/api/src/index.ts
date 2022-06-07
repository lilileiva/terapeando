import { getDiscriminatorModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import userClientModel from './models/userClients'
import userPsychologistModel from './models/userPsychologist'
async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()

// async function testQuery(){
//    const testUser =  new userPsychologistModel({
//       firstName: 'Saul',
//          lastName: 'Goodman',
//          email: 'Saul2@gmail.com',
//          password: 'asasd654ad',
//          birthDate: '15/04/89',
//          country: 'US',
//          License: 'a544sda65s4654asd54a',
//          DNI: 'asdasssdasd456sa54d',
//          Specialties: ['family', 'couple'],
//          profileImage: './images/holaa.png',
//          rating: 5
//    })
//    await testUser.save()
// } 

// testQuery()