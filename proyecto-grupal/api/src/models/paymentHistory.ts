import {prop, getModelForClass, Ref} from '@typegoose/typegoose'

export class paymentHistory{
   
   @prop({ type: String })
   idPsychologist: string

   @prop({ type: String })
   idClient: string

   @prop({ type: Number })
   amount: number
   
   @prop({ type: String })
   email: string

   @prop({ type: String })
   firstName: string

   @prop({ type: String })
   lastName: string

   @prop({ type: String })
   phone: string

   @prop({ type: String })
   address: string

   @prop({ type: String })
   country: string

   @prop({ type: String })
   city: string

   @prop({ type: String })
   currency: string

   @prop({ type: Number })
   celphone: number

   @prop({ type: String })
   psyName: string

   @prop({ default: 'Card' })
   type: string

   @prop({default: Date.now()})
   createdAt: Date 

   @prop({type: Boolean})
   status: boolean
}

const paymentHistoryModel = getModelForClass(paymentHistory)
export default paymentHistoryModel