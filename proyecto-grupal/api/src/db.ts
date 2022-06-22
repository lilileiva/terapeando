import mongoose from 'mongoose'
require('dotenv').config();
const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_CLUSTERNAME } = process.env


// Database Connection
export default async function connectDB() {
   try {
      const db = await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTERNAME}.z5mrv.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
      console.log('database is connected to', db.connection.db.databaseName)
   } catch (e) {
      console.log(e)
   }
}