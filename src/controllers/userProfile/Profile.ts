import express,{Request,Response,Router} from 'express';
const router : Router =express.Router();
import Profile from '../../models/usersSchema/Profile';

router.post("/createProfile",async(req:Request,res:Response)=>{
   try{
    const {userId,occupation,address,country,state,city,zip ,mobileNo,serviceType,message,image} = req.body;
    const { data, contentType } = image;
    if (!occupation || !address || !country || !state || !city || !zip || !mobileNo|| !serviceType|| !message || !userId ||!data || !contentType) {
      return res.status(400).json({
        status : false,
        message : "Missing required field",
        result : null
      });
    }

    const imageData = Buffer.from(data, 'base64');

    const savedProfile = new Profile({
      occupation,address,country,state,city,zip ,mobileNo,serviceType,message,userId,
      image: { data: imageData, contentType }});

      await savedProfile.save();
     res.status(200).json({
      status: true,
      message: "Profile created successfully",
      result: savedProfile
     });

   }catch(error){
    res.status(500).json({
      status: false,
      message: "Error creating profile",
      result: error
  });
  }
});
router.get("/profile/:userId/getProfile", async (req: Request, res: Response) => {
  try {
      const profile = await Profile.find({ userId : req.params.userId});
      res.status(200).json({
          status: true,
          message: "User fetched successfully",
          result: profile
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error fetching Profile",
          result: error
      });
  }
});

router.put("/updateProfile/:id", async (req: Request, res: Response) => {
  try {
      const {userId,occupation,address,country,state,city,zip ,mobileNo,serviceType,message,image}= req.body;
      const updatedProfile = await Profile.findByIdAndUpdate(
          req.params.id,
          {userId,occupation,address,country,state,city,zip ,mobileNo,serviceType,message},
          { new: true }
      );
      if (!updatedProfile) {
          return res.status(404).json({
              status: false,
              message: "Profile not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Profile updated successfully",
          result: updatedProfile
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error updating profile",
          result: error
      });
  }
});

router.delete("/deleteProfile/:id", async (req: Request, res: Response) => {
  try {
      const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
      if (!deletedProfile) {
          return res.status(404).json({
              status: false,
              message: "Profile not found",
              result: null
          });
      }
      res.status(200).json({
          status: true,
          message: "Profile deleted successfully",
          result: deletedProfile
      });
  } catch (error) {
      res.status(500).json({
          status: false,
          message: "Error deleting profile",
          result: error
      });
  }
});

export default router;


