import {prop, getModelForClass, Ref, pre} from '@typegoose/typegoose'


export class Roles {
    @prop()
    user: string
    @prop()
    psychologist: string
    @prop()
    admin: string
}