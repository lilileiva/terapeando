import {prop, getModelForClass, Ref, pre} from '@typegoose/typegoose'


export class Roles {
    @prop()
    role: string
}

const roles = getModelForClass(Roles)

export default roles