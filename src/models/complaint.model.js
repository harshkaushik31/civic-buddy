import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    issueType: {
      type: String,
      enum: [
        "pothole",
        "garbage_dumping",
        "streetlight_broken",
        "water_logging",
        "illegal_construction",
        "other",
      ],
      default: "other",
    },

    description: {
      type: String,
      trim: true,
    },

    location: {
      latitude: { type: Number },
      longitude: { type: Number },
      address: { type: String },
    },

    assignedDepartment: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved", "escalated", "closed"],
      default: "pending",
    },

    municipalReferenceUrl: {
      type: String,
    },

    lastUpdateFromPortal: {
      type: Date,
    },

    escalationCount: {
      type: Number,
      default: 0,
    },
    lastEscalationDate: {
      type: Date,
    },

    rtiDocumentUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Complaint ||
  mongoose.model("Complaint", ComplaintSchema);
