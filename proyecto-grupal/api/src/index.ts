import mongoose from 'mongoose'
import userClientModel from './models/userClients'
import postModel from './models/Post'
import userPsychologistModel from './models/userPsychologist'
import appointmentModel from './models/appointment'
import reviewsModel from './models/Reviews';



async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()

/* async function testQuery(){
   const testpaymentHistory = new paymentHistoryModel({
      status: 'payed',
      price: 1500,
      type: 'debit card',
      client: '629eb20ef872d3554abc739c',
      psychologist: '629f99e7de87372b776f79ed'
   })
   await testpaymentHistory.save()
}
testQuery() */

// async function testQuery(){
//    const testUser =  new userClientModel({
//       firstName: 'Saul',
//          lastName: 'Goodman',
//          email: 'Saul@gmail.com',
//          password: 'asasdad',
//          birthDate: '15/04/89',
//          country: 'US'
//    })
//    await testUser.save()
// } 

// testQuery()

// async function testQuery(){
//    const testReview = new reviewsModel({
//       Content: "cualquier comentario",
//       Stars: 5,
//       IdUserClient: "629eb20ef872d3554abc739c",
//       IdUserPsychologist: "cualquierid"
//    })
//    await testReview.save()
//    console.log(testReview)
// }
// testQuery()

