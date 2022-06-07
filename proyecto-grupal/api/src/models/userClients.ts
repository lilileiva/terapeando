import {prop, getModelForClass} from '@typegoose/typegoose'

class userClient {
    @prop()
    firstName: string
    @prop()
    lastName: string
    @prop()
    email: string
    @prop()
    password: string
    @prop()
    birthDate: string
    @prop()
    country: string
    @prop()
    ProfileImage: string
}

const userClientModel = getModelForClass(userClient)
export default userClientModel