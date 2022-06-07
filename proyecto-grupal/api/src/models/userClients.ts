import {prop, getModelForClass} from '@typegoose/typegoose'

class userClient {
    @prop({ required: true })
    firstName: string
    @prop({ required: true })
    lastName: string
    @prop({ unique: true})
    birthDate: string
    @prop({ required: true })
    country: string
    @prop({ unique: true, required: true})
    password: string
    @prop({ unique: true, required: true, lowercase: true, trim: true })
    email: string
    @prop({required: true })
    profileImage: string
}

const userClientModel = getModelForClass(userClient)
export default userClientModel