import mongoose ,{Schema,Document,Model, NumberExpression} from "mongoose";
interface IPropertyDetails extends Document{
  propertyId :mongoose.Schema.Types.ObjectId,
  homeArea : String;
  floor : Number;
  lotArea : String;
  rooms : Number;
  bedroom : Number;
  bathroom : Number;
  basement : String;
  roofing : String;
  exteriorMaterial : String;
  ownerNotes : String 
}

const propertyDetailSchema : Schema<IPropertyDetails> = new Schema({
  propertyId : {type: Schema.Types.ObjectId,ref:'addPropertyDesc',required: true},
  homeArea : {
    type : String,
    required : true
  },
  floor :{
    type : Number,
    required :true
  },
  lotArea : {type : String ,  required :true},
  rooms :{type : Number, required :true},
  bedroom :{type : Number,  required :true},
  bathroom : {type : Number,  required :true},
  basement : {type : String},
  roofing : {type :String},
  exteriorMaterial :{type : String},
  ownerNotes : {type : String} 
});

const PropertyDetailsModel : Model<IPropertyDetails>= mongoose.model<IPropertyDetails>("PropertyDetails" , propertyDetailSchema);

export default PropertyDetailsModel;