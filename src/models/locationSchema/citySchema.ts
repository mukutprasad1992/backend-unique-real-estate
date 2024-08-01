import mongoose, { Document, Schema } from 'mongoose';

interface ICity extends Document {
  name: string;
  stateId: mongoose.Schema.Types.ObjectId;
}

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  stateId: { type: Schema.Types.ObjectId, ref: 'State', required: true }
});

const City = mongoose.model<ICity>('City', CitySchema);

export default City;