"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Upload, Loader2, CheckCircle, AlertCircle, Video } from "lucide-react";

export default function RegisterComplaintPage() {
  const router = useRouter();

  const [videoFile, setVideoFile] = useState(null);
  const [detectedFrame, setDetectedFrame] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [processingVideo, setProcessingVideo] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const issueType = "pothole";
  const department = "PWD";
  const description = "Pothole detected using AI video analysis.";

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file.");
      return;
    }

    setVideoFile(file);
    setProcessingVideo(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("video", file);

      const response = await axios.post(
        "http://localhost:8000/detect-pothole",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      setDetectedFrame(data.frame_url);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
    } catch (err) {
      console.error(err);
      setError("Video processing failed. Please try again.");
    }

    setProcessingVideo(false);
  };

  const handleSubmit = async () => {
    if (!detectedFrame) {
      setError("Please upload and process a video first.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const submitData = new FormData();

      submitData.append("frame_url", detectedFrame);
      submitData.append("issue-type", issueType);
      submitData.append("description", description);
      submitData.append("assigned-dept", department);
      submitData.append("latitude", latitude);
      submitData.append("longitude", longitude);

      const response = await axios.post(
        "/api/users/register-complaint",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);

        setTimeout(() => {
          router.push("/user-profile/track-complaint");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit complaint.");
    }

    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />

          <h2 className="text-2xl font-bold mb-2">
            Complaint Submitted Successfully
          </h2>

          <p className="text-gray-600">
            Redirecting to complaint tracking page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">

      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-4xl font-bold text-center">
          Register Pothole Complaint
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-xl flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">

          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Video size={20} />
            Upload Video
          </h2>

          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="block w-full text-sm text-gray-300"
          />

          {processingVideo && (
            <div className="flex items-center gap-2 mt-4 text-blue-400">
              <Loader2 className="animate-spin" size={18} />
              Processing video using AI model...
            </div>
          )}

          {videoFile && !processingVideo && (
            <p className="mt-3 text-green-400">
              Video uploaded successfully.
            </p>
          )}
        </div>

        {detectedFrame && (
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">

            <h2 className="text-xl font-semibold mb-4">
              Detected Pothole Frame
            </h2>

            <img
              src={detectedFrame}
              alt="Detected pothole frame"
              className="w-full h-80 object-cover rounded-xl"
            />

            <div className="mt-4 text-sm text-gray-300">
              <p>Latitude: {latitude}</p>
              <p>Longitude: {longitude}</p>
              <p>Issue Type: pothole</p>
              <p>Assigned Department: PWD</p>
            </div>

          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!detectedFrame || submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Submitting Complaint...
            </>
          ) : (
            <>
              <Upload size={20} />
              Register Complaint
            </>
          )}
        </button>

      </div>
    </div>
  );
}

