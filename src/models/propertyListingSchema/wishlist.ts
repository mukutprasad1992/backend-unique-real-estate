import mongoose, { Schema, Document } from "mongoose";

interface IItem extends Document {
  name: string;
  selectedPropertyId: mongoose.Schema.Types.ObjectId;
}

interface IWishlist extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: {
    [key: string]: IItem; // Using a dictionary-like structure for nested items
  };
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  selectedPropertyId: { type: Schema.Types.ObjectId, ref: 'addPropertyDesc', required: true }
});

const WishlistSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  items: { type: Map, of: ItemSchema } // Define items as an embedded document
});

const WishlistModel = mongoose.model<IWishlist>('Wishlist', WishlistSchema);

export default WishlistModel;
