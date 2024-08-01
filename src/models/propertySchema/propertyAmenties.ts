import mongoose,{Schema,Document} from 'mongoose';

interface IMediaRoom {
  exists : boolean;
  size ?: string;
}
interface ISwimmingPool{
  exists : boolean;
  size ?: string;
}

interface IInteriorDetails{
  equipped_kitchen: boolean;
  gym : boolean;
  laundry : boolean;
  mediaRoom : IMediaRoom;
}

interface IOutdoorDetails{
  backyard : boolean;
  basketballCourt : boolean;
  frontyard : boolean;
  garageAttached : boolean;
  hotBath : Boolean;
  swimmingPool : ISwimmingPool;
}

interface IUtilities{
  centralAir : boolean;
  eletricity : boolean;
  heating : boolean;
  naturalGas : boolean;
  ventilation : boolean;
  water : boolean;
}

interface IOtherFeatures{
  chairAccessible : boolean;
  elevator : boolean;
  fireplace : boolean;
  smokeDetector : boolean ;
  washerAndDryer : boolean;
  wifi : boolean;
}



interface IAmenties extends Document {
  propertyId :mongoose.Schema.Types.ObjectId;
  interior_details: IInteriorDetails;
  outdoor_details: IOutdoorDetails;
  utilities: IUtilities;
  other_features: IOtherFeatures;
  created_at: Date;
  updated_at: Date;
}

//Property schema Interface
const AmentiesSchema :Schema = new Schema({
  propertyId : {type: Schema.Types.ObjectId,ref:'addPropertyDesc',required: true},
  interiorDetails :{
     equippedKitchen :{
      type : Boolean,
      default:false
     },
     gym :{
      type : Boolean,
      default:false
     },
     laundry :{
      type : Boolean,
      default:false
     },
     mediaRoom :{
      exists :{type : Boolean,
      default:false
     },
     size :{ type : Boolean,
      default:false}
    }
  },

  outdoorDetails :{
    backyard :{ type : Boolean,
      default:false},
    basketballCourt :{ type : Boolean,
        default:false},
    frontyard :{ type : Boolean,
      default:false},
    garageAttached :{ type : Boolean,
      default:false},
    hotBath : { type : Boolean,
      default:false},
    swimmingPool :{exists:{ type : Boolean,
      default:false},
      size:{ type : Boolean,
        default:false}
    }
  },

  utilities :{
    centralAir :{ type : Boolean,
      default:false},
    electricity :{ type : Boolean,
      default:false},
    heating:{ type : Boolean,
      default:false},
    naturalGas :{ type : Boolean,
      default:false},
    ventilation :{ type : Boolean,
      default:false},
    water :{ type : Boolean,
      default:false}
  },

  otherFeatures :{
    chairAccessible: { type: Boolean, default: false },
    elevator: { type: Boolean, default: false },
    fireplace: { type: Boolean, default: false },
    smokeDetector: { type: Boolean, default: false },
    washerAndDryer: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  
});

const Amenties = mongoose.model<IAmenties>("Amenties",AmentiesSchema);

export default Amenties;