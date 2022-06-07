import {prop, getModelForClass, Ref} from '@typegoose/typegoose'
import { appointment } from './appointment'

export class userClient {
    @prop({ required: true, trim: true })
    firstName: string
    @prop({ required: true, trim: true })
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
    @prop({ ref: () => appointment })
    appointments: Ref<appointment>[];
}

const userClientModel = getModelForClass(userClient)
export default userClientModel