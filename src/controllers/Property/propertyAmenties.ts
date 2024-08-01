import express,{Request,Response,Router} from "express";
const router:Router = express.Router();
import Amenties from "../../models/propertySchema/propertyAmenties";
import PropertyDModel from "../../models/propertySchema/PropertyDesc";

router.post("/createAmenties",async(req:Request,res:Response)=>{
  const {propertyId} = req.body;
  try{
    const findProperty = await PropertyDModel.findOne({_id:propertyId});
    if(!findProperty){
      return res.status(400).json({
        status : false,
        message : "Property not found",
        result : null 
      });
    }
    const newAmenties = new Amenties(req.body);
    if(!newAmenties){
      res.status(400).json({
        status : false,
        message :"Missing required Field",
        result : null
      });
    }

    const savedAmenties = await newAmenties.save();
    res.status(201).json({
      status : true,
      message : "Property Amenties added successfully",
      result : savedAmenties
    })

  }catch(error){
    res.status(500).json({
       status : false,
       message : "Internal Server Error",
       result : error
    })
   }
});

router.get("/property/:propertyDescId/getAmenties",async (req: Request, res : Response)=>{
  try{
    const findAmenties = await Amenties.findOne({propertyId : req.params.propertyDescId});
    if(!findAmenties){
      return res.status(400).json({
        status : false,
        message : "Property not found",
        result : null
      });
    }
    res.status(200).json({
      status : true,
      message : "User Property Amenties Fetched successfully",
      result : findAmenties
    });
}
  catch(error){
     res.status(500).json({
      status : false,
      message : "Internal server error",
      result : error
     });
  }
});

router.put("/updateAmenties/:id", async(req: Request , res: Response)=>{
  try{
   const updateAmenties = await Amenties.findByIdAndUpdate(req.params.id,req.body,{new: true}
   );
   if(!updateAmenties){
    return res.status(404).json({
      status: false,
      message: "Property Amenties not found",
      result: null
    });
   }
   res.status(200).json({
    status: true,
    message: "Property Amenties updated successfully",
    result: updateAmenties
});
  }
  catch(error){
    res.status(500).json({
      status : false,
      message : "Internal server error",
      result : error
     });
  }
});

router.delete("/deleteAmenties/:id", async (req: Request, res: Response) => {
  try {
      const deletedAmenties = await Amenties.findByIdAndDelete(req.params.id);
      if (!deletedAmenties) {
          return res.status(404).json({
              status: false,
              message: "Property Amentites not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Amentites deleted successfully",
          result: deletedAmenties
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error deleting property Amentites ",
          result: error
      });
  }
});

export default router;
