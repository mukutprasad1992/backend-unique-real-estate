import express ,{Request,Response,Router} from "express";
const router : Router = express.Router();
import wishlist from "../../models/propertyListingSchema/wishlist";
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
    const existingWishlist = await wishlist.findOne({userId : userId});
    if(existingWishlist){
      return res.status(400).json({
        status : false,
        mesage :"This user has already wishlist, you only add item ",
        result : null
      });
    }
   const addWishlist = new wishlist(req.body);
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
      result: error
  });}
});

router.get("/wishlist/:userId", async (req: Request, res: Response) => {
  try {
      const findWishProperty = await wishlist.findOne({ userId : req.params.userId});
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
    const addWishProperty = await wishlist.findOne({ userId : req.params.userid});
      if(!addWishProperty){
        return res.status(400).json({
          status : false,
          mesage :"Wishlist not found",
          result : null
        });
      }

      const itemExists = addWishProperty.items.some(item => item.selectedPropertyId.toString() === req.body.selectedPropertyId);

    if (itemExists) {
      return res.status(400).json({
        status: false,
        message: "Property already in wishlist",
        result: null
      });
    }


      if (itemExists) {
        return res.status(400).json({
          status: false,
          message: "Property already in wishlist",
          result: null
        });
      } 

    const addItem = addWishProperty.items.push(req.body);
      await addWishProperty.save();
      res.status(200).json({
          status: true,
          message: "User Wishlist item added successfully",
          result: addItem
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error in adding item Wishlist Property",
          result: error
      });
  }
});

router.delete("/deletewishlist/:userId/items/:itemId", async (req: Request, res: Response) => {
  try {
    const { userId, itemId } = req.params;

    if (!userId || !itemId) {
      return res.status(400).json({
        status: false,
        message: 'userId and itemId are required',
        result: null
      });
    }
    const result = await wishlist.updateOne({ userId },{ $pull: { items: { _id: itemId } } } );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: false,
        message: 'Wishlist not found',
        result: null
      });
    }

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        status: false,
        message: 'Item not found in the wishlist',
        result: null
      });
    }

    res.status(200).json({
      status: true,
      message: 'Item removed from wishlist successfully',
      result: result
    });

  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error in deleting wishlist item",
          result: error
      });
  }
});

export default router;




