import {prop, getModelForClass} from '@typegoose/typegoose'

export class userPsychologist {
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
    License: string
    @prop()
    DNI: string
    @prop()
    Specialties: string[]
    @prop()
    profileImage: string
    @prop()
    scheduleID: string[]
}

const userPsychologistModel = getModelForClass(userPsychologist)
export default userPsychologistModel