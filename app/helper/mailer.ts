import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    } else {
      throw new Error("Invalid email type");
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
      },
    });
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
  <div>
    <h3>${
      emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
    }</h3>
    <p>
      Click the link below to ${
        emailType === "VERIFY"
          ? "verify your email address"
          : "reset your password"
      }:
    </p>
    <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    <p>If you did not request this, please ignore this email.</p>
  </div>
`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
