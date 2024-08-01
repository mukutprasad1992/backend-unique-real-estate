import express, { Request, Response, Router } from 'express';
import Users from '../../models/usersSchema/users';
import bcrypt from 'bcrypt';

const router: Router = express.Router();

const validatePassword = async (password: string, confirmPassword: string) => {
  if (!password || !confirmPassword) {
    return {
      status: false,
      message: "Enter new password or confirm Password",
      result: null
    };
  }

  if (password !== confirmPassword) {
    return {
      status: false,
      message: "Passwords do not match",
      result: null
    };
  }

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!regex.test(password)) {
    return {
      status: false,
      message: "Password must be at least 6 characters long and contain uppercase letters, lowercase letters, numbers, and special characters",
      result: "Retry"
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return {
    status: true,
    message: "Password is valid",
    result: hashedPassword
  };
};

router.post("/reset-password/:token", async (req: Request, res: Response) => {
  const resetToken: string = req.params.token;
  if (!resetToken) {
    return res.status(400).json({
      status: false,
      message: "Empty reset Token",
      result: null
    });
  }

  const { newPassword, confirmPassword } = req.body;

  try {
    const user = await Users.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Password reset token is invalid or has expired",
        result: null
      });
    }

    const validationResponse = await validatePassword(newPassword, confirmPassword);

    if (!validationResponse.status) {
      return res.status(400).json({
        status: false,
        message: validationResponse.message,
        result: validationResponse.result
      });
    }

    // Ensure that validationResponse.result is not null before assigning
    if (validationResponse.result !== null) {
      user.password = validationResponse.result;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return res.status(200).json({
        status: true,
        message: "Successfully reset the password.",
        result: user
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Password validation failed",
        result: null
      });
    }

  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      result: null
    });
  }
});

export default router;
