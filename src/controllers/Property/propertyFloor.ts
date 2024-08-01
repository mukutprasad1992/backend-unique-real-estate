import express ,{Request,Response,Router} from "express";
const router : Router = express.Router();
import PropertyFloorModel from "../../models/propertySchema/propertyFloor";
import PropertyDModel from "../../models/propertySchema/PropertyDesc";

router.post("/createPropertyFloor",async(req:Request,res : Response)=>{
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
   const property = new PropertyFloorModel(req.body);
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
    message : "Property floor added successfully",
    result : savedProperty
  })

  }catch(error:any){
    res.status(500).json({
      status: false,
      message: "Error creating property floor",
      result: error
  });}
});

router.get("/property/:propertyDescId/getPropertyFloor", async (req: Request, res: Response) => {
  try {
      const findProperty = await PropertyFloorModel.findOne({ propertyId : req.params.propertyDescId});
      if(!findProperty){
        return res.status(400).json({
          status : false,
          mesage :"Property not found",
          result : null
        });
      }
      res.status(200).json({
          status: true,
          message: "User Property Floor fetched successfully",
          result: findProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Users Property Floor",
          result: error
      });
  }
});

router.put("/updatePropertyFloor/:id", async (req: Request, res: Response) => {
  try {
      const updatedProperty = await PropertyFloorModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      if (!updatedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property floor not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property floor updated successfully",
          result: updatedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error updating property floor",
          result: error
      });
  }
});

router.delete("/deletePropertyFloor/:id", async (req: Request, res: Response) => {
  try {
      const deletedProperty = await PropertyFloorModel.findByIdAndDelete(req.params.id);
      if (!deletedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property floor not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property floor deleted successfully",
          result: deletedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error deleting property Floor",
          result: error
      });
  }
});

export default router;




