import {prop, getModelForClass, Ref, pre} from '@typegoose/typegoose'
import { appointment } from './appointment';
const bcrypt = require('bcryptjs');


const saltRounds = Number(process.env.SALTROUNDS);

@pre<userClient>('save', function(next) {
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

export class userClient {
    @prop({
        required: true,
        trim: true
        // ,
        // validate: {
        //   validator: (firstName: string) => {
        //     const nameRegExp = /^[A-Za-z]+$/;
        //     return nameRegExp.test(firstName);
        //   },
        //   message: 'Name is invalid.',
        // }
    })
    firstName: string

    @prop({ required: true, trim: true })
    lastName: string

    @prop({  trim: true })
    birthDate: string

    @prop({ required: true })
    country: string

    @prop({ required:true, minlength:8 })
    password: string

    @prop({
        unique: true,
        required: true,
        lowercase: true,
        trim: true
        // ,
        // validate: {
        //   validator: (email: string) => {
        //     const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return emailRegExp.test(email);
        //   },
        //   message: 'Email is invalid.',
        // }
    })
    email: string

    @prop({ required: true })
    profileImage: string

    @prop()
    role: string
}

const userClientModel = getModelForClass(userClient)

export default userClientModel