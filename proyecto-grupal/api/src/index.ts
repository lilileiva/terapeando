import { getDiscriminatorModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import userClientModel from './models/userClients'

async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db)
}

connectDB()

async function testQuery(){
   const testUser =  new userClientModel({
      firstName: 'Saul',
         lastName: 'Goodman',
         email: 'Saul@gmail.com',
         password: 'asasdad',
         birthDate: '15/04/89',
         country: 'US'
   })
   await testUser.save()
} 

testQuery()