import { Schema, model } from 'mongoose';

interface IState {
    name: string;
    abbreviation: string;
}

const stateSchema = new Schema<IState>({
    name: { type: String, required: true },
    abbreviation: { type: String, required: true }
});

const State = model<IState>('State', stateSchema);

export default State;
