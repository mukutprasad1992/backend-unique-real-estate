import express ,{Request,Response,Router} from "express";
const router : Router = express.Router();
import PropertyPriceModel from "../../models/propertySchema/propertyPrice";
import PropertyDModel from "../../models/propertySchema/PropertyDesc";

router.post("/createPropertyPrice",async(req:Request,res : Response)=>{
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
   const property = new PropertyPriceModel(req.body);
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
    message : "Property price added successfully",
    result : savedProperty
  })

  }catch(error:any){
    res.status(500).json({
      status: false,
      message: "Error creating property Price",
      result: error
  });}
});

router.get("/property/:propertyDescId/getPropertyPrice", async (req: Request, res: Response) => {
  try {
      const findProperty = await PropertyPriceModel.findOne({ propertyId : req.params.propertyDescId});
      if(!findProperty){
        return res.status(400).json({
          status : false,
          mesage :"Property not found",
          result : null
        });
      }
      res.status(200).json({
          status: true,
          message: "User Property Price fetched successfully",
          result: findProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Users Property Price",
          result: error
      });
  }
});

router.put("/updatePropertyPrice/:id", async (req: Request, res: Response) => {
  try {
      const {price,afterDate,beforeDate,yearlyTaxRate,HOAMonthly}= req.body;
      const updatedProperty = await PropertyPriceModel.findByIdAndUpdate(
          req.params.id,
          {price,afterDate,beforeDate,yearlyTaxRate,HOAMonthly},
          { new: true }
      );
      if (!updatedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property price not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Price updated successfully",
          result: updatedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error updating property price",
          result: error
      });
  }
});

router.delete("/deletePropertyPrice/:id", async (req: Request, res: Response) => {
  try {
      const deletedProperty = await PropertyPriceModel.findByIdAndDelete(req.params.id);
      if (!deletedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property Price not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Price deleted successfully",
          result: deletedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error deleting property Price",
          result: error
      });
  }
});

export default router;




