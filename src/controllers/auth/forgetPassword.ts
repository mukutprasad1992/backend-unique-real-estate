import express, { Request, Response, Router } from 'express';
import Users from '../../models/usersSchema/users';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const router: Router = express.Router();

function validateEmail(email: string): void {
  if (email === null || email === "") {
    throw new Error("Email cannot be null or empty");
  }
}

router.post("/forget-password", async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    if (email === null || email === "") {
      return res.status(200).json({
        status: true,
        message: "Email cannot be null or empty",
        result: null
      });
    }
    if (!email || typeof email !== 'string') {
      return res.status(400).send('Invalid email format');
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        result: null
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'katlyn2@ethereal.email',
        pass: 'zu1jUuUfn3yYaYE1fw'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      to: user.email,
      from: '"Roshni Sable" <Roshni@gmail.com>',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             http://localhost:3000/reset-password/${token}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`
    });

    return res.status(201).json({
      status: true,
      message: "Recovery email has been sent to your email",
      result: email
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Error sending mail",
      result: err
    });
  }
});

export default router;
