import express ,{Request,Response,Router} from "express";
const router : Router = express.Router();
import PropertyLocation from "../../models/propertySchema/propertyLocation";
import PropertyDModel from "../../models/propertySchema/PropertyDesc";

router.post("/createPropertyLocation",async(req:Request,res : Response)=>{
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
   const property = new PropertyLocation(req.body);
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
    message : "Property location added successfully",
    result : savedProperty
  })

  }catch(error:any){
    res.status(500).json({
      status: false,
      message: "Error creating property Location",
      result: error
  });}
});

router.get("/property/:propertyDescId/getPropertyLocation", async (req: Request, res: Response) => {
  try {
      const findProperty = await PropertyLocation.findOne({ propertyId : req.params.propertyDescId});
      if(!findProperty){
        return res.status(400).json({
          status : false,
          mesage :"Property not found",
          result : null
        });
      }
      res.status(200).json({
          status: true,
          message: "User Property Location fetched successfully",
          result: findProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Users Property Location",
          result: error
      });
  }
});

router.put("/updatePropertyLocation/:id", async (req: Request, res: Response) => {
  try {
      const updatedProperty = await PropertyLocation.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      if (!updatedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property location not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Location updated successfully",
          result: updatedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error updating property location",
          result: error
      });
  }
});

router.delete("/deletePropertyLocation/:id", async (req: Request, res: Response) => {
  try {
      const deletedProperty = await PropertyLocation.findByIdAndDelete(req.params.id);
      if (!deletedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property Location not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Location deleted successfully",
          result: deletedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error deleting property Location",
          result: error
      });
  }
});

export default router;




