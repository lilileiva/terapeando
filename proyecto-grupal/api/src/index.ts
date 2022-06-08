import mongoose from 'mongoose'
// import scheduleModule from './models/Schedule'
// import userPsychologistModel from './models/userPsychologist'
// import userClientModel from './models/userClients'
import express from 'express' // instale npm i @types/express -D como dependecia de desarrollo para que entienda modulos de express
const routes = require('./routes/index.ts')



// Database connection

async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()


// server  inicializations

const app = express() 
app.set( 'port', process.env.PORT || 3000 )

// Middlewares

app.use(express.json()); // para que entienda el formato json

// routes

app.use('/', routes)

// starting server 

app.listen(app.get('port'), () => {
   console.log('server on port', app.get('port'))
});



// async function testQuery() {


   // const testUser = new userClientModel({
   //    firstName: 'juana',
   //    lastName: 'Goodman',
   //    email: 'mail12@gmail.com',
   //    password: '12345678b',
   //    birthDate: '15/04/89',
   //    country: 'US',
   //    profileImage: "https://wallpaperaccess.com/full/4595683.jpg",
   //    appointments: ["629fccb8317c52ef8a029864", "629fcd138a1941e759e97ffb"]
   // })
   // await testUser.save()

   // const testUserPsychologist = new userPsychologistModel({
   //    firstName: 'pedro',
   //    lastName: 'Goodman',
   //    email: 'mail2@gmail.com',
   //    password: '12345678a',
   //    birthDate: '15/04/89',
   //    country: 'US',
   //    DNI: '12123123',
   //    License: 'License',
   //    profileImage: "https://wallpaperaccess.com/full/4595683.jpg",
   //    appointments: ["629fccb8317c52ef8a029864", "629fcd138a1941e759e97ffb"]
   // })
   // await testUserPsychologist.save()

   // const user = await userClientModel.findById("629fe14d30a908292c6ef72b").populate(
   //    "appointments"
   // )
   // console.log(user)

// }

// async function testQuer(){
//    const testUser =  new userClientModel({
//       firstName: 'Walter',
//          lastName: 'White',
//          email: 'heisenberg@gmail.com',
//          password: '1234',
//          birthDate: '15/04/89',
//          country: 'US'
//    })
//    await testUser.save()
// } 

// testQuer()

// testQuery()


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

