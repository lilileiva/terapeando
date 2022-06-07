import {prop, getModelForClass, Ref} from '@typegoose/typegoose'
import { userClient } from './userClients'

class paymentHistory{
   //pagado, no pagado
   @prop({ type: String })
   status: string

   @prop({ type: Number })
   price: number
   // mercado pago
   @prop()
   type: string[]

   client: Ref<userClient>
   psychologist: Ref<userPsychologist>
}

const paymentHistoryModel = getModelForClass(paymentHistory)
export default paymentHistoryModel