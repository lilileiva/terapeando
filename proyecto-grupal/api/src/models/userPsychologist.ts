import { prop, getModelForClass, Ref, pre } from '@typegoose/typegoose'
import { appointment } from './appointment';
const bcrypt = require('bcryptjs');


const saltRounds = Number(process.env.SALTROUNDS);
@pre<userPsychologist>('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, saltRounds, (err: any, hashedPassword: any) => {
      if (err) next(err);
      else this.password = hashedPassword;
      next();
    })
  } else {
    next();
  }
})

export class userPsychologist {
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

    @prop({
        required: true,
        trim: true
        // ,
        // validate: {
        //   validator: (lastName: string) => {
        //     const nameRegExp = /^[A-Za-z]+$/;
        //     return nameRegExp.test(lastName);
        //   },
        //   message: 'Name is invalid.',
        // }
    })
    lastName: string

  @prop({
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (email: string) => {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(email);
      },
      message: 'Email is invalid.',
    }
  })
  email: string

  @prop({ unique: false, required: true, minlength: 8 })
  password: string

  @prop({ required: true })
  birthDate: string

  @prop({ required: true })
  location: string

  @prop({ required: true })
  latitude: string

  @prop({ required: true })
  longitude: string

  @prop({ unique: true, required: true })
  License: string

  @prop()
  about: string

  @prop()
  education: string

  @prop({ unique: true, required: true })
  DNI: string

  @prop({ required: true })
  Specialties: string[]

  @prop({ required: true })
  profileImage: string

  @prop()
  rating: number

  @prop()
  status:string

  @prop()
  psychologistStatus:string
  // @prop()
  // Reviews?: String[];

  // @prop({ ref: () => appointment })
  // appointments?: Ref<appointment>[];

  @prop()
  role: string

}

const userPsychologistModel = getModelForClass(userPsychologist)
export default userPsychologistModel;