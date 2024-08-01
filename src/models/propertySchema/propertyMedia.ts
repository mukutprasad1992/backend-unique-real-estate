import mongoose, { Document, Schema } from 'mongoose';

// Define the Media interface
interface IMedia extends Document {
  propertyId :mongoose.Schema.Types.ObjectId,
  gallery: string[]; 
  videos: string[]; 
  description: string; 
}

// Define the Media schema
const mediaSchema: Schema = new Schema({
  propertyId : {type: Schema.Types.ObjectId,ref:'addPropertyDesc',required: true},
  gallery: [{ type: String, required: true }], 
  videos: [{ type: String, required: false }], 
  description: { type: String, required: true },
}, { timestamps: true }); 

// Create and export the model
const PropertyMedia = mongoose.model<IMedia>('Media', mediaSchema);

export default PropertyMedia;
