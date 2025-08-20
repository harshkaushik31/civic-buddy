import { connectDB } from "@/utils/connectDB";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    // validation
    console.log("Email: ", email, "Password: ", password);

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { message: "User does not exits" },
        { status: 400 }
      );
    }

    console.log("User exists");

    console.log(user);

    console.log("Plain password:", password);
    console.log("Hashed password from DB:", user.password);

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Check your credientials" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Login Success",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging in: ", error },
      { status: 500 }
    );
  }
}
