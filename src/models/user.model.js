import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, 
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["citizen", "municipal_staff", "admin"],
      default: "citizen",
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },
    complaints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
