import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
import City from '../../models/locationSchema/citySchema';

// Add a new city
router.post('/createCity', async (req: Request, res: Response) => {
  try {
    const newCity = new City(req.body);
    await newCity.save();
    res.status(200).json({
      status: true,
      message: "City created successfully",
      result: newCity
  });
  } catch (error) {
    res.status(500).json({
        status: false,
        message: "Error in creating city",
        result: error
    });
}
});

// Get all cities in a state
router.get('/states/:stateId/getCity', async (req: Request, res: Response) => {
  try {
    const cities = await City.find({ stateId: req.params.stateId });
     res.status(200).json({
      status: true,
      message: "Cities fetched successfully",
      result: cities
  });;
  } catch (error) {
    res.status(500).json({
        status: false,
        message: "Error fetching state",
        result: error
    });
}
});

// Get city by ID
router.get('/getCity/:id', async (req: Request, res: Response) => {
  try {
    const city = await City.findById(req.params.id);
    if (city) {
      res.status(200).json({
        status: true,
        message: "City fetched successfully",
        result: city
    });
    } else {
      res.status(404).json({ 
        status : false,
        message: 'City not found',
        result : null
       });
    }
  } catch (error) {
    res.status(500).json({
        status: false,
        message: "Error fetching city by id",
        result: error
    });
}
});

// Update an existing city
router.put('/updateCity/:id', async (req: Request, res: Response) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedCity) {
      res.status(200).json({
        status: true,
        message: "City updated successfully",
        result: updatedCity
    });
    } else {
      res.status(404).json({
        status : false,
        message: 'City not found',
        result : null
       });
    }
  } catch (error) {
    res.status(500).json({
        status: false,
        message: "Error in updating city",
        result: error
    });
}
});

router.delete('/deleteCity/:id', async (req: Request, res: Response) => {
  try {
    const result = await City.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({
        status: true,
        message: "City deleted successfully",
        result: result
    });
    } else {
      res.status(404).json({ 
        status : false,
        message: 'City not found',
        result : null  
      });
    }
  } catch (error) {
    res.status(500).json({
        status: false,
        message: "Error in deleting city",
        result: error
    });
}
});

export default router;
    