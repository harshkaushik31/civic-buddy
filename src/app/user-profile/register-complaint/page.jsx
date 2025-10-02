"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  Upload, 
  MapPin, 
  FileText, 
  Camera, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  X,
  RotateCcw
} from "lucide-react";

export default function Page() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    assignedDepartment: "",
    latitude: "",
    longitude: "",
    address: ""
  });
  
  // File and UI state
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  // Issue types and departments
  const issueTypes = [
    { value: "pothole", label: "Pothole" },
    { value: "streetlight_broken", label: "Street Light" },
    { value: "garbage_dumping", label: "Garbage Collection" },
    { value: "water_supply", label: "Water Supply" },
    { value: "sewage", label: "Sewage Problem" },
    { value: "road_damage", label: "Road Damage" },
    { value: "traffic_signal", label: "Traffic Signal" },
    { value: "illegal_construction", label: "Illegal Construction" },
    { value: "noise_pollution", label: "Noise Pollution" },
    { value: "other", label: "Other" }
  ];

  const departments = [
    { value: "PWD", label: "Public Works Department (PWD)" },
    { value: "NRDA", label: "Naya Raipur Development Authority (NRDA)" },
    { value: "NRMC", label: "Naya Raipur Municipal Corporation (NRMC)" },
    { value: "Electricity", label: "Electricity Department" },
    { value: "Water", label: "Water Supply Department" },
    { value: "Traffic", label: "Traffic Police" },
    { value: "Environment", label: "Environment Department" },
    { value: "", label: "Auto-assign based on issue type" }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
        setError("");
      } else {
        setError("Please select a valid image file");
      }
    }
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    setLocationLoading(true);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        setFormData(prev => ({
          ...prev,
          latitude: latitude.toString(),
          longitude: longitude.toString()
        }));

        try {
          setFormData(prev => ({
            ...prev,
            address: `Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        } catch (error) {
          console.log("Error getting address:", error);
        }
        
        setLocationLoading(false);
      },
      (error) => {
        setError("Unable to retrieve your location");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError("Please upload an image of the issue");
      return;
    }
    
    if (!formData.description.trim()) {
      setError("Please provide a description of the issue");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const submitData = new FormData();
      submitData.append("file", selectedFile);
      submitData.append("issue-type", formData.issueType);
      submitData.append("description", formData.description);
      submitData.append("assigned-dept", formData.assignedDepartment);
      
      if (formData.latitude && formData.longitude) {
        submitData.append("latitude", formData.latitude);
        submitData.append("longitude", formData.longitude);
      }
      
      if (formData.address) {
        submitData.append("address", formData.address);
      }

      const response = await axios.post("/api/users/register-complaint", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSuccess(true);
        // Reset form after successful submission
        setTimeout(() => {
          router.push(`/user-profile/track-complaint`);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setError(
        error.response?.data?.message || 
        "Failed to submit complaint. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Complaint Submitted Successfully!
            </h1>
            <p className="text-gray-600">
              Your complaint has been registered and will be processed soon.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-800 text-sm">
              You will be redirected to the tracking page in a few seconds...
            </p>
          </div>
          
          <button
            onClick={() => router.push("/user-profile/track-complaint")}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors"
          >
            Track Your Complaint
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Register New Complaint
          </h1>
          <p className="text-gray-600 text-lg">
            Report an issue in your area and help improve your community
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
            <button onClick={() => setError("")} className="ml-auto">
              <X className="text-red-400 hover:text-red-600" size={16} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="mr-2" size={24} />
              Upload Image
            </h2>
            
            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-2">Click to upload an image of the issue</p>
                <p className="text-sm text-gray-400">Supports: JPG, PNG, GIF (Max 10MB)</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Issue Details */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="mr-2" size={24} />
              Issue Details
            </h2>
            
            <div className="space-y-4">
              {/* Issue Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issue Type *
                </label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select an issue type</option>
                  {issueTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  required
                />
              </div>

              {/* Department Assignment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Department
                </label>
                <select
                  name="assignedDepartment"
                  value={formData.assignedDepartment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Leave blank for automatic assignment based on issue type
                </p>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="mr-2" size={24} />
              Location Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                >
                  {locationLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <MapPin size={20} />
                  )}
                  <span>
                    {locationLoading ? "Getting Location..." : "Get Current Location"}
                  </span>
                </button>
              </div>

              {/* Manual Location Input */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    step="any"
                    placeholder="e.g., 21.205726"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    step="any"
                    placeholder="e.g., 81.824707"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address/Landmark
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g., Near International Cricket Stadium"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <button
              type="submit"
              disabled={isSubmitting || !selectedFile || !formData.description.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Submitting Complaint...</span>
                </>
              ) : (
                <>
                  <FileText size={20} />
                  <span>Submit Complaint</span>
                </>
              )}
            </button>
            
            <p className="text-sm text-gray-500 text-center mt-3">
              * Image and description are required fields
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}