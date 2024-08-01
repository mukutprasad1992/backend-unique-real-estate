import mongoose ,{Schema,Document,Model} from "mongoose";

interface IPropertyFloor extends Document{
  propertyId : mongoose.Schema.Types.ObjectId;
  floorNo : Number;
  floorplan : String;
  totalArea : String;
  bedroomArea : String;
  belconyPets : Boolean;
  loungeArea : String;
  description : String

}
const floorSchema : Schema<IPropertyFloor> = new Schema({
  propertyId : {type: Schema.Types.ObjectId,ref:'addPropertyDesc',required: true},
  floorNo : {type : Number ,required : true},
  floorplan : {type : String ,required : true},
  totalArea : {type : String,required : true},
  bedroomArea : {type : String ,required : true},
  belconyPets : {type : Boolean ,required : true},
  loungeArea : {type : String ,required : true},
  description : {type : String ,required : true}

});

const PropertyFloorModel : Model<IPropertyFloor>= mongoose.model<IPropertyFloor>("PropertyFloor" , floorSchema);

export default PropertyFloorModel;
