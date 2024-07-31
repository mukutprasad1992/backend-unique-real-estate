import mongoose ,{Schema,Document,Model} from "mongoose";

interface IPropertyDescription extends Document{
  userId : mongoose.Schema.Types.ObjectId;
  status : String;
  type : String;
  title : String;
  description : String;
  buildYear : Number;
  date  : Date;
}
const propertyDescriptionSchema : Schema<IPropertyDescription> = new Schema({
  userId : {type: Schema.Types.ObjectId,ref:'Users',required: true},
  status : {
    type : String,
    required : true,
    trim :true
  },
  type :{
    type :String,
    required : true,
    trim : true
  },
  title :{
    type :String,
    required : true,
    trim : true
  }, 
  description :{
    type :String,
    required : true,
    trim : true
  },
  buildYear :{
    type :Number,
    required : true,
    validate: {
      validator:function (value){ 
        return Number.isInteger(value) && value >= 1900 && value <= new Date().getFullYear();
      },
      message: (props:any) => `${props.value} is not a valid year. Year must be an integer between 1900 and ${new Date().getFullYear()}.`
    }
  },
  date :{
    type : Date,
    required : true,
  }
})

const PropertyDModel : Model<IPropertyDescription>= mongoose.model<IPropertyDescription>("PropertyDescription" , propertyDescriptionSchema);

export default PropertyDModel;
