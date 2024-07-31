import mongoose ,{Schema,Document,Model, NumberExpression} from "mongoose";
interface IPropertyPrice extends Document{
  propertyId : mongoose.Schema.Types.ObjectId;
  price : Number;
  afterDate : Date;
  beforeDate : Date;
  yearlyTaxRate : Number;
  HOAMonthly  : Number;
}
const propertyDSchema : Schema<IPropertyPrice> = new Schema({
  propertyId : {type: Schema.Types.ObjectId,ref:'addPropertyDesc',required: true},
  price: {
    type : Number,
    required : true,
    trim :true
  },
  afterDate :{type :Date},
  beforeDate :{ type :Date}, 
  yearlyTaxRate :{ type :Number},
  HOAMonthly :{type : Number }
});

const PropertyPriceModel : Model<IPropertyPrice>= mongoose.model<IPropertyPrice>("PropertyPrice" , propertyDSchema);

export default PropertyPriceModel;
