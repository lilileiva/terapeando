import mongoose from 'mongoose'
import express from 'express' // instale npm i @types/express -D como dependecia de desarrollo para que entienda modulos de express
import morgan from 'morgan'
const routes = require('./routes/index.ts')
<<<<<<< HEAD

// Database connection
=======
const cors = require('cors')
// Database Connection

>>>>>>> 89cc514ea385ec20d816e9d5c4f7e1fa93b4f040
async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()
<<<<<<< HEAD

// server inicializations
const app = express() 
app.set( 'port', process.env.PORT || 3000 )

// Middlewares
app.use(express.json()); // para que entienda el formato json

=======
// server  inicializations

const app = express() 
app.set( 'port', process.env.PORT || 3000 )
// Middlewares
app.use(express.json()); // para que entienda el formato json

app.use(morgan('dev'))

app.use(cors())
app.use(express.urlencoded({extended:false}))
>>>>>>> 89cc514ea385ec20d816e9d5c4f7e1fa93b4f040
// routes
app.use('/', routes)
// starting server 
app.listen(app.get('port'), () => {
   console.log('server on port', app.get('port'))
});
<<<<<<< HEAD


// import userClientModel from './models/userClients'
// async function testQuery() {

   // const userClient = await userClientModel.findById("62a0b7a6a2f79f295c70cf7b");
   // console.log(userClient)

   // const testUser = new userClientModel({
   //    firstName: 'juana',
   //    lastName: 'Goodman',
   //    email: 'mail123@gmail.com',
   //    password: '12345678b',
   //    birthDate: '05/04/89',
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
// testQuery()

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


=======
>>>>>>> 89cc514ea385ec20d816e9d5c4f7e1fa93b4f040
