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
      await User.findByIdAndUpdate(userId, {
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

    const subject =
      emailType === "VERIFY"
        ? "🔐 Action Required: Verify Your Email"
        : "🔐 Password Reset Request";

    const actionUrl = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">${
          emailType === "VERIFY"
            ? "Verify Your Email Address"
            : "Reset Your Password"
        }</h2>
        <p>Hello,</p>
        <p>Please click the button below to ${
          emailType === "VERIFY"
            ? "confirm your email address and activate your account"
            : "reset your password"
        }:</p>
        <a href="${actionUrl}" target="_blank" style="padding: 12px 20px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; display: inline-block;">
          ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
        </a>
        <p>Or you can directly visit this link:</p>
        <a href="${actionUrl}" target="_blank">${actionUrl}</a>
        <br />
        <p style="font-size: 12px; color: #888;">
          If you did not request this, please ignore this email. Your account is safe.
        </p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #888;">
          © ${new Date().getFullYear()} YourCompany. All rights reserved.
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: subject,
      html: htmlContent,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
