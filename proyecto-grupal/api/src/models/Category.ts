import {prop,Ref, getModelForClass} from '@typegoose/typegoose'
class Category{
    @prop()
    name: string; 
}
const categoryModel = getModelForClass(Category)
export default categoryModel;