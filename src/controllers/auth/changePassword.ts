import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import Users from '../../models/usersSchema/users';

const router = Router();



router.put("/changePassword/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confirmChangePassword } = req.body;

  try {
    // Find the user by ID
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
        result: null
      });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Old password is incorrect',
        result: null
      });
    }

    const Regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    // Validate new password against regex
    if (!Regex.test(newPassword)) {
      return res.status(400).json({
        status: 'error',
        message: 'New password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long',
        result: null
      });
    }

    // Check if newPassword and confirmChangePassword match
    if (newPassword !== confirmChangePassword) {
      return res.status(400).json({
        status: 'error',
        message: 'New password and confirm password do not match',
        result: null
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password with the hashed password
    user.password = hashedPassword;
    await user.save();

    res.json({
      status: 'success',
      message: `Password changed successfully for user with ID ${id}`,
      result: null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
      result: null
    });
  }
});

export default router;
