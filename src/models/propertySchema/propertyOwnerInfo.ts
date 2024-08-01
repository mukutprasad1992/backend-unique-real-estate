import mongoose ,{Schema,Document,Model} from "mongoose";

interface IPropertyOwner extends Document{
  userId :mongoose.Schema.Types.ObjectId;
  propertyId : mongoose.Schema.Types.ObjectId;
  displayName : String;
  occupation : String; //owner occupation
  displayEmailId :string;
  companyName ?: string;
  companyAddress ?: string;
  facbook  ?: string;
  Insta    ?: string ;
  Twitter  ?: string;
  Youtube ?: string;
}
const propertyOwnerInfoSchema : Schema<IPropertyOwner> = new Schema({
  userId : {type: Schema.Types.ObjectId,ref:'Users',required: true},
  propertyId : {type: Schema.Types.ObjectId,ref:'addPropertyDesc',required: true},
  displayName : {type : String ,required : true,trim: true},
  occupation : {type : String ,required : true, trim: true}, //owner occupation
  displayEmailId :{type: String,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^\S+@gmail\.com$/.test(v); // Simple email validation regex
      },
      message: (props: any) => `${props.value} is not a valid email address!`
    }
},
  companyName : {type : String },
  companyAddress : {type : String },
  facbook  : {type : String ,unique : true},
  Insta    : {type : String ,unique : true},
  Twitter  :{type : String ,unique : true},
  Youtube  : {type : String ,unique : true},

});

const PropertyOwnerModel : Model<IPropertyOwner>= mongoose.model<IPropertyOwner>("PropertyOwnerInfo" , propertyOwnerInfoSchema);

export default PropertyOwnerModel;
