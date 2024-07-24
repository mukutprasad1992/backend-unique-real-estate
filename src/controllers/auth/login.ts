import express, { Request, Response, Router } from 'express';
import Users from '../../models/users';
import bcrypt from 'bcrypt';

const router: Router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
        result: null
      });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        result: null
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.status(200).json({
        status: true,
        message: "User login successful",
        result: user
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Invalid password. Please try again.",
        result: null
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      result: null
    });
  }
});

export default router;
