import mongoose from 'mongoose'
import scheduleModule from './models/Schedule'


async function connectDB() {
   const db = await mongoose.connect('mongodb+srv://proyectogrupal:VNWSkd5ixj7hLVTo@proyectogrupal.z5mrv.mongodb.net/ProyectoGrupaltest?retryWrites=true&w=majority')
   console.log('database is connected to', db.connection.db.databaseName)
}

connectDB()



// async function testQuery(){
//    const testschedule = new scheduleModule({
//       idUserPsychologist: '629f99e7de87372b776f79ed',
//       dateTime: [
//          {
//             monday: [10, 15, 20],
//             tuesday: [9, 11, 16],
//             wensday: [],
//             thursday: [],
//             friday: [15, 18, 19],
//             saturday: [],
//             sunday: [9],
//          }
//       ] 
//    })
//    await testschedule.save()
// }
// testQuery()

<<<<<<< HEAD
async function testQuer(){
   const testUser =  new userClientModel({
      firstName: 'Walter',
         lastName: 'White',
         email: 'heisenberg@gmail.com',
         password: '1234',
         birthDate: '15/04/89',
         country: 'US'
   })
   await testUser.save()
} 

testQuer()
=======
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
//    const testAppointment = new appointmentModel({
//       client: '629eb20ef872d3554abc739c',
//       psychologist: '629f97f5c767d20e0acad126',
//       payment: '629f9ce6ee9896aabc5fbcd2',
//       date: '07-06-2022',
//       hour: '18:00',
//       type: 'presencial'
//    })
//    await testAppointment.save()
// }
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
   await testAppointment.save()
}
testQuery() */
>>>>>>> de9500fefc7d53db788d5040e9219c521325a107

// async function testQuery(){
//    const testAppointment = new appointmentModel({
//       client: '629eb20ef872d3554abc739c',
//       psychologist: '629f97f5c767d20e0acad126',
//       payment: '629f9ce6ee9896aabc5fbcd2',
//       date: '07-06-2022',
//       hour: '18:00',
//       type: 'presencial'
//    })
//    await testAppointment.save()
// }
// testQuery()