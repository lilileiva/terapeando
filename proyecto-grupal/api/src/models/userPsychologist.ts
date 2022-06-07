import {prop, getModelForClass} from '@typegoose/typegoose'
import * as mongoose from 'mongoose'

export class userPsychologist {
    @prop({ required: true, trim: true  })
    firstName: string
    @prop({ required: true, trim: true })
    lastName: string
    @prop({ unique: true, required: true, lowercase: true, trim: true })
    email: string
    @prop({ unique: true, required: true, minlength:8})
    password: string
    @prop({ required: true })
    birthDate: string
    @prop({  required: true })
    country: string
    @prop({ unique: true, required: true })
    License: string
    @prop({ unique: true, required: true })
    DNI: string
    @prop({ required: true })
    Specialties: string[]
    @prop({required: true })
    profileImage: string
    @prop()
    rating: number
    // @prop({ ref: () => appointment })
    // appointments?: Ref<appointment>[]; 
}

const userPsychologistModel = getModelForClass(userPsychologist)
export default userPsychologistModel;