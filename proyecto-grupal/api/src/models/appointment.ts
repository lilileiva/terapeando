import { prop, Ref } from '@typegoose/typegoose';
import { userClient } from './userClients';
import { userPsychologist } from './userPsychologist';


class appointment {
    @prop({ref: () => userClient})
    client: Ref<userClient>
    @prop({ref: () => userPsychologist})
    psicologist: Ref<userPsychologist>
    // @prop({ref: () => })
    // payment:
    @prop({ type: String, required: true, trim: true})
    date: string
    @prop({ type: String, required: true, trim: true })
    hour: string
    @prop({ type: String, required: true, trim: true })
    type: string[]
}

export default appointment;