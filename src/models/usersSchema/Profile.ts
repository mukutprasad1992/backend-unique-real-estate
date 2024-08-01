import mongoose,{Schema , Document, Model} from 'mongoose';
interface IProfile extends Document{
  userId : mongoose.Schema.Types.ObjectId;
  occupation : string;
  address : string;
  country : string;
  state : string;
  city  : string;
  zip : number;
  mobileNo : number;
  serviceType : string;
  message : string;
  image :{
    data :Buffer;
    contentType : string;
  }
}  

const profileSchema: Schema =new Schema({
  userId : {type: Schema.Types.ObjectId,ref:'Users',required: true},
  occupation :{type: String},
  address :{type : String ,required:true},
  country : {type :String ,required:true},
  state :{type : String , required: true},
  city :{type : String , required: true},
  zip : {type: Number , required: true,
    validator: function (v: string) {
      return /^[0-9]{6}(?:-[0-9]{5})?$/.test(v);
    },
    message: (props: any) => `${props.value} is not a valid zip code!`
  },
  mobileNo :{type: Number , required: true, 
    validate: {
    validator: function (v: string) {
      return /^\d{10}$/.test(v);
    },
    message: (props: any) => `${props.value} is not a valid 10-digit mobile number!`
  }},
  serviceType : {type : String , required: true},
  message : {type : String , required: true},
  image :{data: { type: Buffer, required: true },
  contentType: { type: String, required: true } }
}) ;

const Profile = mongoose.model<IProfile>('Profile',profileSchema);

export default Profile;