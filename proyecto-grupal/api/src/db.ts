import mongoose from 'mongoose'
require('dotenv').config();
const {DB_NAME, DB_PASSWORD, DB_USERNAME, DB_CLUSTERNAME} = process.env
// Database Connection

export default async function connectDB() {
   try{
      // const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
      const db = await mongoose.connect('mongodb://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal-shard-00-00.z5mrv.mongodb.net:27017,proyectogrupal-shard-00-01.z5mrv.mongodb.net:27017,proyectogrupal-shard-00-02.z5mrv.mongodb.net:27017/ProyectoGrupaltest?ssl=true&replicaSet=atlas-xq3ym6-shard-0&authSource=admin&retryWrites=true&w=majority')
      console.log('database is connected to', db.connection.db.databaseName)
   }catch(e){
      console.log(e)
   }
}