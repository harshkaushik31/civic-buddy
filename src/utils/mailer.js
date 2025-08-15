import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcyrptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userID }) => {
  try {
    const hashToken = await bcyrptjs.hash(userID.toString(), 10);

    //TODO: Configure mailer for usage
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const actionLink =
      emailType === "VERIFY"
        ? `${baseUrl}/verify-email?token=${hashToken}`
        : `${baseUrl}/reset-password?token=${hashToken}`;

    const mailOptions = {
      from: "civic.buddy.gov.in",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>${
        emailType === "VERIFY"
          ? "Welcome to Civic Buddy!"
          : "Password Reset Request"
      }</h2>
      <p>${
        emailType === "VERIFY"
          ? "Thank you for registering with Civic Buddy. Please click the button below to verify your email address."
          : "We received a request to reset your password. Please click the button below to set a new password."
      }</p>
      <a href="${actionLink}" 
         style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
         ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
      </a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${actionLink}">${actionLink}</a></p>
      <p>If you did not request this, you can ignore this email.</p>
    </div>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {
    console.log("Could not send email ", error);
  }
};
