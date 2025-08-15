import { connectDB } from "@/utils/connectDB";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connectDB();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Removing the password from saved User to return 
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    //Sending verification email
    await sendEmail({ email, emailType: "VERIFY", userID: savedUser._id });

    return NextResponse.json(
      { message: "User Registered Successfully", success: true, userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
