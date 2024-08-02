import mongoose,{Schema,Document}from "mongoose";

interface Iitem{
  name : string;
  selectedPropertyId : mongoose.Schema.Types.ObjectId; 
}

interface IWishlist  extends Document{
  userId : mongoose.Schema.Types.ObjectId;
  items : Iitem[];
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  selectedPropertyId : {type : Schema.Types.ObjectId , ref :'addPropertyDesc', required: true}
});

const WishlistSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref : "Users" ,required: true },
  items: [ItemSchema]
});

export default mongoose.model<IWishlist>('Wishlist', WishlistSchema);
