import mongoose from 'mongoose'
import userClientModel from './models/userClients'
import userPsychologistModel from './models/userPsychologist'
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



async function Reviews(){
   const testReviews =  new reviewsModel({
      Content: 'articulo',
      Stars: 5,
      IdUserClient: '629eb20ef872d3554abc739c',
      IdUserPsychologist: '629f97f5c767d20e0acad126'
   })
   await testReviews.save()
   console.log(testReviews)
} 

Reviews()


