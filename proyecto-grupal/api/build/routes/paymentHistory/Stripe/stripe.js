const stripe = require('stripe')(process.env.SECRET_KEY)

module.exports = {
   stripe
}

