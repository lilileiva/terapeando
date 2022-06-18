const stripeAPI = require('stripe')('sk_test_51LAZBmE2MhU3DqIS5onGhkOOoFTYm3tjggVwGfK2s620WLjj4euMlhVgPyZIgUjCVetThYJeFhOB3d6xItx0CcDv00n0lyA3fO')
const WEB_HOOK_SECRET='whsec_52d5dfbbb95ec3f2c51986a613eb964c3c7c7120fbf97502f654a66807dd6db8'
const express = require('express');



const app = express();

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Stripe requires the raw body to construct the event
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(req.body, sig, WEB_HOOK_SECRET);
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Successfully constructed event
  console.log('✅ Success:', event.data.object);

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
});
