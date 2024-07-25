import mongoose, { Document, Schema } from 'mongoose';

interface IBlock extends Document {
  name: string;
  cityId: mongoose.Schema.Types.ObjectId;
}

const BlockSchema: Schema = new Schema({
  name: { type: String, required: true },
  cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true }
});

const Block = mongoose.model<IBlock>('Block', BlockSchema);

export default Block