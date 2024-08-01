import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
import Block from '../../models/locationSchema/blockSchema';

// Add a new block
router.post('/createBlock', async (req: Request, res: Response) => {
  try {
    const newBlock = new Block(req.body);
    await newBlock.save();
    res.status(200).json({
      status: true,
      message: "Block created successfully",
      result: newBlock
    });
  } catch (error) {
    res.status(500).json({
        status: false,
        message: "Error in creating block",
        result: error
    });
}
});

//Get all Blocks
router.get('/cities/:cityId/blocks', async (req: Request, res: Response) => {
  try {
    const blocks = await Block.find({ cityId: req.params.cityId });
    res.status(200).json({
      status: true,
      message: "Block fetched successfully by id",
      result: blocks
    });
  }catch (error) {
    res.status(500).json({
        status: false,
        message: "Error in fetching city",
        result: error
    });
}
});

// Get block by ID
router.get('/blocks/:id', async (req: Request, res: Response) => {
  try {
    const block = await Block.findById(req.params.id);
    if (block) {
      res.status(200).json({
        status: true,
        message: "block fetched by Id successfully",
        result: block
      });
    } else {
      res.status(404).json({ 
        status : false,
        message: 'Block not found',
        result : null
       });
    }
  } catch (error) {
    res.status(500).json({
        status: false,
        message: "Error in feching block by id",
        result: error
    });
}
});

// Update an existing block
router.put('/updateBlocks/:id', async (req: Request, res: Response) => {
  try {
    const updatedBlock = await Block.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedBlock) {
      res.status(200).json({
        status: true,
        message: "Block updated successfully",
        result: updatedBlock
      });
    } else {
      res.status(404).json({
        status : false,
        message: 'Block not found',
         result : null
        });
    }
  } catch (error) {
    res.status(500).json({
        status: false,
        message: "Error in updating block",
        result: error
    });
}
});

router.delete('/deleteBlocks/:id', async (req: Request, res: Response) => {
  const deletedBlock = await Block.findByIdAndDelete(req.params.id);
  if (deletedBlock) {
    res.status(200).json({
      status: true,
      message: "Block deleted successfully",
      result: deletedBlock
    });
  } else {
    res.status(500).json({
      status: false,
      message: "Error in deleting block",
      result: null
  });
  }
});

export default router;