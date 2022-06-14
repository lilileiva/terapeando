require('dotenv').config();
const {MONGODB_URI} = process.env
export default {
    jwtSecret: process.env.JWT_SECRET,
    DB: {
        URI: MONGODB_URI,
        USER:'',
        PASSWORD: ''
    }
}