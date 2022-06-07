import mongoose from 'mongoose'

async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()



