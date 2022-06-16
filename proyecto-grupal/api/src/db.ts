import mongoose from 'mongoose'
require('dotenv').config();
const { MONGODB_URI } = process.env


// Database Connection

export default async function connectDB() {
   try {
      const db = await mongoose.connect(`${MONGODB_URI}`)
      console.log('database is connected to database')
   } catch (error) {
      console.log('Error al conectar a la base de datos')   
   }
}