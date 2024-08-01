import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
import Country from '../../models/locationSchema/countrySchema';

router.get("/getAllCountry", async (req: Request, res: Response) => {
    try {
        const states = await Country.find({});
        res.status(200).json({
            status: true,
            message: "Countries fetched successfully",
            result: states
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error fetching Countries",
            result: error
        });
    }
});


router.get("/getCountry/:id", async (req: Request, res: Response) => {
    try {
        const state = await Country.findById(req.params.id);
        if (!state) {
            return res.status(404).json({
                status: false,
                message: "Country not found",
                result: null
            });
        }
        res.status(200).json({
            status: true,
            message: "Country fetched successfully",
            result: state
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error fetching Country",
            result: error
        });
    }
});


router.post("/createCountry", async (req: Request, res: Response) => {
    try {
        const { name, abbreviation } = req.body;
        const newCountry = new Country({ name, abbreviation });
        const savedCountry = await newCountry.save();
        res.status(201).json({
            status: true,
            message: "Country created successfully",
            result: savedCountry
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error creating Country",
            result: error
        });
    }
});


router.put("/updateCountry/:id", async (req: Request, res: Response) => {
    try {
        const { name, abbreviation } = req.body;
        const updatedCountry = await Country.findByIdAndUpdate(
            req.params.id,
            { name, abbreviation },
            { new: true }
        );
        if (!updatedCountry) {
            return res.status(404).json({
                status: false,
                message: "Country not found",
                result: null
            });
        }
        res.status(200).json({
            status: true,
            message: "Country updated successfully",
            result: updatedCountry
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error updating Country",
            result: error
        });
    }
});

router.delete("/deleteCountry/:id", async (req: Request, res: Response) => {
    try {
        const deletedCountry = await Country.findByIdAndDelete(req.params.id);
        if (!deletedCountry) {
            return res.status(404).json({
                status: false,
                message: "Country not found",
                result: null
            });
        }
        res.status(200).json({
            status: true,
            message: "Country deleted successfully",
            result: deletedCountry
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error deleting state",
            result: error
        });
    }
});

export default router;