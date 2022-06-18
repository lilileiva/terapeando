import {prop, getModelForClass, pre} from '@typegoose/typegoose'
const bcrypt = require('bcryptjs');


const saltRounds = Number(process.env.SALTROUNDS)

@pre<Admin>('save', function(next) {
    if (this.isModified('password')) {        
        bcrypt.hash(this.password, saltRounds, (err: any, hashedPassword: any) => {
            if (err) next(err);
            else this.password = hashedPassword;
            next();
        } )
    } else {
        next();
    }
})

export class Admin {
    @prop({
        required: true,
        trim: true
    })
    firstName: string

    @prop({ required: true, trim: true })
    lastName: string

    @prop({ required: true, minlength:8 })
    password: string

    @prop({
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    })
    email: string
    @prop()
    role: string
}

const adminModel = getModelForClass(Admin)

export default adminModel