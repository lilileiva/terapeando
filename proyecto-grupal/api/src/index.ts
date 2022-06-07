import mongoose from 'mongoose'

//testasasaas
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