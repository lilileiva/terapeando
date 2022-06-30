const stripeAPI = require('stripe')('sk_test_51LAZBmE2MhU3DqIS5onGhkOOoFTYm3tjggVwGfK2s620WLjj4euMlhVgPyZIgUjCVetThYJeFhOB3d6xItx0CcDv00n0lyA3fO')
/* const domainUrl = process.env.WEB_APP_URL; */

const createCheckoutSession = async (req, res) => {
   const domainUrl = 'http://localhost:3000'
   const { line_items, customer_email } = req.body;

   if(!line_items || !customer_email){
      return res.status(400).json({error: 'missing requires session parameters'})
   }

  try {    
   let session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: line_items,
      customer_email: customer_email,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
   })
   res.status(200).json({ sessionId: session.id  })
   } catch (error){
       console.log(error)
       res.status(400).json({ error: 'an error occured, unable to create session' })
   }
}

module.exports = {
   createCheckoutSession,
}