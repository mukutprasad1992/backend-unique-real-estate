import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
import State from '../../models/stateSchema';

router.post("/createState", async (req: Request, res: Response) => {
    try {
        const newState = new State(req.body);
        const savedState = await newState.save();
        res.status(200).json({
            status: true,
            message: "State created successfully",
            result: savedState
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error creating state",
            result: error
        });
    }
});

router.get("/country/:countryId/getState", async (req: Request, res: Response) => {
    try {
        const states = await State.find({ countryId : req.params.countryId});
        res.status(200).json({
            status: true,
            message: "States fetched successfully",
            result: states
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error fetching states",
            result: error
        });
    }
});


router.get("/getState/:id", async (req: Request, res: Response) => {
    try {
        const state = await State.findById(req.params.id);
        if (!state) {
            return res.status(404).json({
                status: false,
                message: "State not found",
                result: null
            });
        }
        res.status(200).json({
            status: true,
            message: "State fetched successfully",
            result: state
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error fetching state",
            result: error
        });
    }
});


router.put("/updateState/:id", async (req: Request, res: Response) => {
    try {
        const { name,abbreviation} = req.body;
        const updatedState = await State.findByIdAndUpdate(
            req.params.id,
            { name, abbreviation },
            { new: true }
        );
        if (!updatedState) {
            return res.status(404).json({
                status: false,
                message: "State not found",
                result: null
            });
        }
        res.status(200).json({
            status: true,
            message: "State updated successfully",
            result: updatedState
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error updating state",
            result: error
        });
    }
});

router.delete("/deleteState/:id", async (req: Request, res: Response) => {
    try {
        const deletedState = await State.findByIdAndDelete(req.params.id);
        if (!deletedState) {
            return res.status(404).json({
                status: false,
                message: "State not found",
                result: null
            });
        }
        res.status(200).json({
            status: true,
            message: "State deleted successfully",
            result: deletedState
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
