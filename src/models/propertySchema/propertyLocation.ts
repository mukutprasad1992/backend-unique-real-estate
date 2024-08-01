import mongoose,{Schema,Document,Model} from "mongoose";

interface ILocation extends  Document{
 propertyId : mongoose.Schema.Types.ObjectId,
 address : String,
 country : String,
 state : String,
 city : String,
 zip : Number,
 neighbourhood :  String,
 googleMap : String,
 latitude : Number
 longitude : Number
}

const LocationSchema: Schema<ILocation> = new Schema({
  propertyId : {type: Schema.Types.ObjectId,ref:'addPropertyDesc',required: true},
  address : {type : String ,required : true},
  country : {type : String ,required : true},
  state : {type : String ,required : true},
  city : {type : String ,required : true},
  zip : {type : String ,required : true},
  neighbourhood : {type : String },
  googleMap : {type : String ,required : true},
  latitude : {type : String ,required : true},
  longitude: {type : String ,required : true}
});  

const LocationModel : Model<ILocation> = mongoose.model<ILocation>("PropertyLocation",LocationSchema);

export default LocationModel;