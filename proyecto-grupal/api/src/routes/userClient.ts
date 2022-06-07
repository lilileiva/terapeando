export {}

const { Router } = require('express');
const router = Router()

router.post("/", async (req, res) => {
   try{
      const { firstName, lastName, email, password, birthDate, country, profileImage } = req.body

      const userclient = new userClient ({
         firstName,
         lastName,
         email,
         password,
         birthDate,
         country,
         profileImage
      })

      await userclient.save()
      res.status(201).send(userclient)
   } catch (err) {
      console.log({msg: err})
   }
})

module.exports = router;