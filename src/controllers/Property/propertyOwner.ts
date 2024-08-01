import express ,{Request,Response,Router} from "express";
const router : Router = express.Router();
import PropertyOwnerModel from "../../models/propertySchema/propertyOwnerInfo";
import Users from "../../models/usersSchema/users";
import PropertyDModel from "../../models/propertySchema/PropertyDesc";

router.post("/createPropertyOwner",async(req:Request,res : Response)=>{
  const {userId} = req.body;
  const {propertyId} = req.body;
  try{
    const findUsers = await Users.findOne({_id:userId});
    const findProperty = await PropertyDModel.findOne({_id:propertyId});
    if(!findUsers){
      return res.status(400).json({
        status : false,
        mesage :"User not found",
        result : null
    });
  }
    if(!findProperty){
      return res.status(400).json({
        status : false,
        mesage :"Property not found",
        result : null
      });
    }
   const property = new PropertyOwnerModel(req.body);
   if(!property){
    res.status(400).json({
      status : false,
      mesage :"Missing required Field",
      result : null
    });
   }
  const savedProperty = await property.save();
  res.status(201).json({
    status : true,
    message : "Property Owner added successfully",
    result : savedProperty
  })

  }catch(error:any){
    res.status(500).json({
      status: false,
      message: "Error creating property Owner",
      result: error
  });}
});

router.get("/propertybyid/:propertyDescId/getPropertyOwner", async (req: Request, res: Response) => {
  try {
      const findProperty = await PropertyOwnerModel.findOne({ propertyId : req.params.propertyDescId});
      if(!findProperty){
        return res.status(400).json({
          status : false,
          mesage :"Property not found",
          result : null
        });
      }
      res.status(200).json({
          status: true,
          message: "Property Owner fetched successfully by property Id",
          result: findProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Users Property Owner by property Id",
          result: error
      });
  }
});

router.get("/propertybyuser/:usersId/getPropertyOwner", async (req: Request, res: Response) => {
  try {
      const findUser = await PropertyOwnerModel.findOne({ userId : req.params.usersId});
      if(!findUser){
        return res.status(400).json({
          status : false,
          mesage :"User not found",
          result : null
        });
      }
      res.status(200).json({
          status: true,
          message: "Property Owner fetched successfully by user Id ",
          result: findUser
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Users Property Owner by user Id",
          result: error
      });
  }
});

router.put("/updatePropertyOwner/:id", async (req: Request, res: Response) => {
  try {
      const updatedProperty = await PropertyOwnerModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      if (!updatedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property owner not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Owner updated successfully",
          result: updatedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error updating property owner",
          result: error
      });
  }
});

router.delete("/deletePropertyOwner/:id", async (req: Request, res: Response) => {
  try {
      const deletedProperty = await PropertyOwnerModel.findByIdAndDelete(req.params.id);
      if (!deletedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property Owner not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Owner deleted successfully",
          result: deletedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error deleting property Owner",
          result: error
      });
  }
});

export default router;




