import express ,{Request,Response,Router} from "express";
const router : Router = express.Router();
import PropertyDetailsModel from "../../models/propertySchema/PropertyDetails";
import PropertyDModel from "../../models/propertySchema/PropertyDesc";

router.post("/createPropertyDetail",async(req:Request,res : Response)=>{
  const {propertyId} = req.body;
  try{
    const findProperty = await PropertyDModel.findOne({ _id: propertyId});
    if(!findProperty){
      return res.status(400).json({
        status : false,
        message :"Property not found",
        result : null
      });
    }
   const property = new PropertyDetailsModel(req.body);
   if(!property){
    res.status(400).json({
      status : false,
      message :"Missing required Field",
      result : null
    });
   }
  const savedProperty = await property.save();
  res.status(201).json({
    status : true,
    message : "Property details added successfully",
    result : savedProperty
  })

  }catch(error:any){
    res.status(500).json({
      status: false,
      message: "Error creating property Details",
      result: error
  });}
});

router.get("/property/:propertyDescId/getPropertyDetail", async (req: Request, res: Response) => {
  try {
      const findProperty = await PropertyDetailsModel.findOne({ propertyId : req.params.propertyDescId});
      if(!findProperty){
        return res.status(400).json({
          status : false,
          mesage :"Property not found",
          result : null
        });
      }
      res.status(200).json({
          status: true,
          message: "User Property Detail fetched successfully",
          result: findProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Users Property Detail",
          result: error
      });
  }
});

router.put("/updatePropertyDetails/:id", async (req: Request, res: Response) => {
  try {
      const {homeArea,floor,lotArea,rooms,bedroom,bathroom,basement,roofing,exteriorMaterial,ownerNotes}= req.body;
      const updatedProperty = await PropertyDetailsModel.findByIdAndUpdate(
          req.params.id,
          {homeArea,floor,lotArea,rooms,bedroom,bathroom,basement,roofing,exteriorMaterial,ownerNotes},
          { new: true }
      );
      if (!updatedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property details not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property details updated successfully",
          result: updatedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error updating property details",
          result: error
      });
  }
});

router.delete("/deletePropertyDetails/:id", async (req: Request, res: Response) => {
  try {
      const deletedProperty = await PropertyDetailsModel.findByIdAndDelete(req.params.id);
      if (!deletedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property Details not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Details deleted successfully",
          result: deletedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error deleting property Detail",
          result: error
      });
  }
});

export default router;
