import { Schema, model } from 'mongoose';

interface ICountry {
    name: string;
    abbreviation: string;
}

const countrySchema = new Schema<ICountry>({
    name: { type: String, required: true },
    abbreviation: { type: String, required: true }
});

const State = model<ICountry>('Country', countrySchema);

export default State;