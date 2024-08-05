import express ,{Request,Response,Router} from "express";
const router : Router = express.Router();
import mongoose from "mongoose";
import WishlistModel from "../../models/propertyListingSchema/wishlist";
import Users from "../../models/usersSchema/users";
import PropertyDModel from "../../models/propertySchema/PropertyDesc";

router.post("/createPropertyWishlist",async(req:Request,res : Response)=>{
  const {userId} = req.body;
  
  try{
    const findUser = await Users.findOne({_id: userId});
    if(!findUser){
      return res.status(400).json({
        status : false,
        mesage :"User not found",
        result : null
      });
    }
    const existingWishlist = await WishlistModel.findOne({userId : userId});
    if(existingWishlist){
      return res.status(400).json({
        status : false,
        mesage :"This user has already wishlist, you only add item ",
        result : null
      });
    }
   const addWishlist = new WishlistModel(req.body);
   if(!addWishlist){
    res.status(400).json({
      status : false,
      mesage :"Missing required Field",
      result : null
    });
   }
  const savedProperty = await addWishlist.save();
  res.status(201).json({
    status : true,
    message : "Property added in wishlist successfully",
    result : savedProperty
  })

  }catch(error:any){
    res.status(500).json({
      status: false,
      message: "Error in adding wishlist property",
      result: error.message
  });}
});

router.get("/wishlist/:userId", async (req: Request, res: Response) => {
  try {
      const findWishProperty = await WishlistModel.findOne({ userId : req.params.userId});
      if(!findWishProperty){
        return res.status(400).json({
          status : false,
          mesage :"Wish Property not found",
          result : null
        });
      }
      res.status(200).json({
          status: true,
          message: "User Wishlist Property fetched successfully",
          result: findWishProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Users Wishlist Property",
          result: error
      });
  }
});

router.post("/wishlist/:userid/items", async (req: Request, res: Response) => {
  try {    
    const userId = req.params.id;
    const { name, selectedPropertyId, itemKey } = req.body;
    if (!mongoose.Types.ObjectId.isValid(selectedPropertyId)) {
      return res.status(400).json({
        status: false,
        message: "selectedPropertyId",
        result: null
      });
    }

    // Ensure all required fields are provided
    if (!name || !selectedPropertyId || !itemKey) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields in request body",
        result: null
      });
    }

    const wishlist = await WishlistModel.findOne({ userId: req.params.userid });
      if (!wishlist) {
      return res.status(400).json({
        status: false,
        message: "Wishlist not found",
        result: null
      });
    }

    const propertyId = selectedPropertyId;

    // Check if the property is already in the wishlist
    if (wishlist.items.selectedPropertyId === propertyId) {
      return res.status(400).json({
        status: false,
        message: "Property already in wishlist",
        result: null
      });
    }

    // Add or update the item in the wishlist
    const newItem = {
      name: name,
      selectedPropertyId: new mongoose.Types.ObjectId(selectedPropertyId)
    };

    const result = await WishlistModel.findOneAndUpdate(
      { userId: req.params.userid },
      { $set: { [`items.${itemKey}`]: newItem } }, // Add or update the nested object
      { new: true, runValidators: true } // Return the updated document and validate schema
    );
    if (!result) {
      return res.status(404).json({
        status: false,
        message: "Wishlist not found or failed to update",
        result: null
      });
    }

    res.status(200).json({
      status: true,
      message: "User Wishlist item added successfully",
      result: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error in adding item to Wishlist",
      result: error
    });
  }
});

router.delete("/wishlist/:userid/items/:itemKey", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userid;
    const itemKey = req.params.itemKey;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid userId",
        result: null
      });
    }

    // Find and update the wishlist document
    const updatedWishlist = await WishlistModel.findOneAndUpdate(
      { userId: userId },
      { $unset: { [`items.${itemKey}`]: "" } }, // Remove the item from the map
      { new: true }
    );

    if (!updatedWishlist) {
      return res.status(404).json({
        status: false,
        message: "Wishlist not found or item not removed",
        result: null
      });
    }

    res.status(200).json({
      status: true,
      message: "Item removed from Wishlist successfully",
      result: updatedWishlist.items
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error in removing item from Wishlist",
      result: error
    });
  }
});


export default router;




