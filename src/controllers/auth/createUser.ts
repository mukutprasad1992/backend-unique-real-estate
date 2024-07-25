import express, { Request, Response, Router } from 'express';
import Users from '../../models/users';
import bcrypt from 'bcrypt';

const router: Router = express.Router();

function validateEmail(email: string): void {
  if (email === null || email === "") {
    throw new Error("Email cannot be null or empty");
  }
}

router.post("/createUser", async (req: Request, res: Response) => {
  try {
    validateEmail(req.body.email);

    const { firstName, lastName, email, confirmPassword } = req.body;
    const password = req.body.password;

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regex.test(password)) {
      return res.status(404).json({
        status: false,
        message: `Password must be at least 6 characters long and contain uppercase letters, lowercase letters, numbers, and special characters`,
        result: "Retry"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({ firstName, lastName, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json({
      status: true,
      message: "User created successfully",
      result: savedUser
    });

  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.get("/getAllUser", async (req: Request, res: Response) => {
  try {
    const getUser = await Users.find({});
    res.status(200).json({
      status: true,
      message: "Here Users Details",
      result: getUser
    });
  } catch (e) {
    res.status(404).json({
      status: false,
      message: "Something error to fetch users details",
      result: e
    });
  }
});

router.get("/getUserById/:id", async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const getUserById = await Users.findById({ _id });
    res.status(201).json({
      status: true,
      message: "User Details Fetched",
      result: getUserById
    });
  } catch (e) {
    res.status(404).json({
      status: false,
      message: "Invalid User Id",
      result: null
    });
  }
});

router.put("/updateUserById/:id", async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const getUserById = await Users.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(201).json({
      status: true,
      message: "User has been Updated",
      result: getUserById
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Invalid User Id",
      result: null
    });
  }
});

router.delete("/deleteUserById/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const delUserById = await Users.findByIdAndDelete(id);
    res.status(201).json({
      status: true,
      message: "User deleted Sucessfully",
      result: delUserById
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Invalid User Id",
      result: null
    });
  }
});

export default router;
