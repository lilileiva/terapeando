<<<<<<< HEAD:proyecto-grupal/api/src/routes/userClient/userClient.ts
import userClientModel from "../../models/userClients";


=======
// export {}
>>>>>>> 53131b96ca80b25a360dc55918e8ea52b8eb7a62:proyecto-grupal/api/src/routes/userClient.ts

// const { Router, Request, Response } = require('express');
import { Router } from "express"
const router = Router()

<<<<<<< HEAD:proyecto-grupal/api/src/routes/userClient/userClient.ts
router.post("/", async (req: any, res:any) => {
   try{
      const { firstName, lastName, email, password, birthDate, country, profileImage } = req.body
=======
// router.post("/", async (req, res) => {
//    try{
//       const { firstName, lastName, email, password, birthDate, country, profileImage } = req.body
>>>>>>> 53131b96ca80b25a360dc55918e8ea52b8eb7a62:proyecto-grupal/api/src/routes/userClient.ts

//       const userclient = new userClient ({
//          firstName,
//          lastName,
//          email,
//          password,
//          birthDate,
//          country,
//          profileImage
//       })

//       await userclient.save()
//       res.status(201).send(userclient)
//    } catch (err) {
//       console.log({msg: err})
//    }
// })

// module.exports = router;