import {prop, getModelForClass, Ref} from '@typegoose/typegoose'
<<<<<<< HEAD
import * as mongoose from 'mongoose';
import { appointment } from './appointment';
import { Schedule } from './Schedule';
=======
import * as mongoose from 'mongoose'
import { appointment } from './appointment'
>>>>>>> 53131b96ca80b25a360dc55918e8ea52b8eb7a62

export class userPsychologist {
    @prop({ required: true, trim: true  })
    firstName: string
    @prop({ required: true, trim: true })
    lastName: string
    @prop({ unique: true, required: true, lowercase: true, trim: true })
    email: string
    @prop({ required: true, minlength:8 })
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
    @prop({ ref: () => appointment })
<<<<<<< HEAD
    appointments?: Ref<appointment>[]; 
    @prop({ ref: () => Schedule })
    schedule?: Ref<Schedule>[]; 
=======
    appointments: Ref<appointment>[];
>>>>>>> 53131b96ca80b25a360dc55918e8ea52b8eb7a62
}

const userPsychologistModel = getModelForClass(userPsychologist)
export default userPsychologistModel;