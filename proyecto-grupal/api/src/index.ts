import mongoose from 'mongoose'
import scheduleModule from './models/Schedule'
import userPsychologistModel from './models/userPsychologist'
import userClientModel from './models/userClients'


async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()



async function testQuery() {

   const testUser = new userClientModel({
      firstName: 'juan',
      lastName: 'Goodman',
      email: 'Saul@gmail.com',
      password: '12345678',
      birthDate: '15/04/89',
      country: 'US',
      profileImage: "https://wallpaperaccess.com/full/4595683.jpg",
      appointments: ["629fccb8317c52ef8a029864", "629fcd138a1941e759e97ffb"]
   })

   const testUserPsychologist = new userPsychologistModel({
      firstName: 'pedro',
      lastName: 'Goodman',
      email: 'Saul@gmail.com',
      password: '12345678',
      birthDate: '15/04/89',
      country: 'US',
      DNI: '12123123',
      License: 'License',
      profileImage: "https://wallpaperaccess.com/full/4595683.jpg",
      appointments: ["629fccb8317c52ef8a029864", "629fcd138a1941e759e97ffb"]
   })
   await testUserPsychologist.save()
}

testQuery()


/* async function testQuery(){
   const testAppointment = new appointmentModel({
      client: '629eb20ef872d3554abc739c',
      psychologist: '629f97f5c767d20e0acad126',
      payment: '629f9ce6ee9896aabc5fbcd2',
      date: '07-06-2022',
      hour: '18:00',
      type: 'presencial'
   })
   await testUser.save()

   const testUserPsychologist = new userPsychologistModel({
      firstName: 'pedro',
      lastName: 'Goodman',
      email: 'Saul@gmail.com',
      password: '12345678',
      birthDate: '15/04/89',
      country: 'US',
      DNI: '12123123',
      License: 'License',
      profileImage: "https://wallpaperaccess.com/full/4595683.jpg",
      appointments: ["629fccb8317c52ef8a029864", "629fcd138a1941e759e97ffb"]
   })
   await testUserPsychologist.save()
}

testQuery() */

// async function testQuery(){
//    const testAppointment = new appointmentModel({
//       date: '11-06-2022',
//       hour: '18:00',
//       type: 'presencial'
//    })
//    await testAppointment.save()
// }
// testQuery()

