import {prop, getModelForClass, Ref} from '@typegoose/typegoose'
import { userClient } from './userClients'
import { userPsychologist } from './userPsychologist'

export class paymentHistory{
   
   @prop({ type: String })
   status: string

   @prop({ type: Number })
   price: number
   
   @prop({ type: String })
   type: string

   @prop({ref: () => userClient})
   client: Ref<userClient>

   @prop({ref: () => userPsychologist})
   psychologist: Ref<userPsychologist>
}

const paymentHistoryModel = getModelForClass(paymentHistory)
export default paymentHistoryModel