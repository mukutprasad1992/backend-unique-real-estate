import mongoose,{ Schema, model } from 'mongoose';

interface IState extends Document{
    name: string;
    abbreviation: string; 
    countryId: mongoose.Schema.Types.ObjectId;
}

const stateSchema = new Schema<IState>({
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    countryId: { type: Schema.Types.ObjectId, ref: 'Country', required: true }
});

const State = model<IState>('State', stateSchema);

export default State;
