import express ,{Request,Response,Router} from "express";
const router : Router = express.Router();
import PropertyMedia from "../../models/propertySchema/propertyMedia";
import PropertyDModel from "../../models/propertySchema/PropertyDesc";

router.post("/createPropertyMedia",async(req:Request,res : Response)=>{
  const {propertyId} = req.body;
  try{
    const findProperty = await PropertyDModel.findOne({_id:propertyId});
    if(!findProperty){
      return res.status(400).json({
        status : false,
        mesage :"Property not found",
        result : null
      });
    }
   const property = new PropertyMedia(req.body);
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
    message : "Property media added successfully",
    result : savedProperty
  })

  }catch(error:any){
    res.status(500).json({
      status: false,
      message: "Error creating property media",
      result: error
  });}
});

router.get("/property/:propertyDescId/getPropertyMedia", async (req: Request, res: Response) => {
  try {
      const findProperty = await PropertyMedia.findOne({ propertyId : req.params.propertyDescId});
      if(!findProperty){
        return res.status(400).json({
          status : false,
          mesage :"Property not found",
          result : null
        });
      }
      res.status(200).json({
          status: true,
          message: "User Property Media fetched successfully",
          result: findProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Users Property Media",
          result: error
      });
  }
});

router.put("/updatePropertyMedia/:id", async (req: Request, res: Response) => {
  try {
      const updatedProperty = await PropertyMedia.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      if (!updatedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property media not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Media updated successfully",
          result: updatedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error updating property media",
          result: error
      });
  }
});

router.delete("/deletePropertyMedia/:id", async (req: Request, res: Response) => {
  try {
      const deletedProperty = await PropertyMedia.findByIdAndDelete(req.params.id);
      if (!deletedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property Media not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Media deleted successfully",
          result: deletedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error deleting property Media",
          result: error
      });
  }
});

export default router;




