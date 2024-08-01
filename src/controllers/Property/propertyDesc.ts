import express ,{Request,Response,Router} from "express";
const router : Router = express.Router();
import PropertyDescriptionModel from "../../models/propertySchema/PropertyDesc";
import Users from "../../models/usersSchema/users";

router.post("/createPropertyDescription",async(req:Request,res : Response)=>{
    const {userId} = req.body;
    try{
    const findUser = await Users.findOne({ _id: userId});
    if(!findUser){
      return res.status(400).json({
        status : false,
        mesage :"User not found",
        result : null
      });
    }
   const property = new PropertyDescriptionModel(req.body);
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
    message : "Property description added successfully",
    result : savedProperty
  })

  }catch(error:any){
    res.status(500).json({
      status: false,
      message: "Error creating property Description",
      result: error
  });}
});

router.get("/property/:userId/getPropertyDescription", async (req: Request, res: Response) => {
  try {
      const property = await PropertyDescriptionModel.findOne({ userId : req.params.userId});
      if(!property){
        return res.status(400).json({
          status : false,
          mesage :"Property Description not found",
          result : null
        });
      }
      return res.status(200).json({
          status: true,
          message: "User Property Decscription fetched successfully",
          result: property
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Users Property Description",
          result: error
      });
  }
});

router.get("/getPropertyDescription/:id", async (req: Request, res: Response) => {
  try {
      const property = await PropertyDescriptionModel.findOne({_id:req.params.id});
      if(!property){
        return res.status(400).json({
          status : false,
          mesage :"Property Description not found",
          result : null
        });
      }
      return res.status(200).json({
          status: true,
          message: "Property Description fetched successfully",
          result: property
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Property Description",
          result: error
      });
  }
});

router.put("/updatePropertyDescription/:id", async (req: Request, res: Response) => {
  try {
      const { status,type,title,description,buildYear,date}= req.body;
      const updatedProperty = await PropertyDescriptionModel.findByIdAndUpdate(
          req.params.id,
          {status,type,title,description,buildYear,date},
          { new: true }
      );
      if (!updatedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property description not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property description updated successfully",
          result: updatedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error updating property description",
          result: error
      });
  }
});

router.delete("/deletePropertyDescription/:id", async (req: Request, res: Response) => {
  try {
      const deletedProperty = await PropertyDescriptionModel.findByIdAndDelete(req.params.id);
      if (!deletedProperty) {
          return res.status(404).json({
              status: false,
              message: "Property description not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Property Description deleted successfully",
          result: deletedProperty
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error deleting property description",
          result: error
      });
  }
});

export default router;




