import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import complaintModel from "@/models/complaint.model";
import { uploadToCloudinary } from "@/utils/cloudinary-upload";

connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({
        success: false,
        message: "File not found",
        statusCode: 404,
      });
    }

    // Upload file to Cloudinary and get the URL
    const imageUrl = await uploadToCloudinary(file, "civic-buddy");

    return NextResponse.json({
      success: true,
      message: "File uploaded to cloudinary successfully",
      imageUrl: imageUrl,
      statusCode: 200,
    });

  } catch (error) {
    console.log("Error occurred during upload: ", error);
    return NextResponse.json({
      success: false,
      message: error.message || "File upload failed",
      statusCode: 500,
    });
  }
}

// TODO: delete before deploying

// the above code's response
// {
//     "success": true,
//     "message": "File uploaded to cloudinary successfully",
//     "imageUrl": "https://res.cloudinary.com/dpcal7pun/image/upload/v1758604288/civic-buddy/ltxcmyv53ktowhunw6h7.jpg",
//     "statusCode": 200
// }


// import { connectDB } from "@/utils/connectDB";
// import { NextRequest, NextResponse } from "next/server";
// import complaintModel from "@/models/complaint.model";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY,
// });

// connectDB();

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file");
//     const folderName = "civic-buddy";
    
//     if (!file) {
//       return NextResponse.json({
//         success: false,
//         message: "File not found",
//         statusCode: 404,
//       });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
    
//     const result = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: folderName,
//         },
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//       uploadStream.end(buffer);
//     });

//     return NextResponse.json({
//       success: true,
//       message: "File uploaded to cloudinary",
//       data: result,
//       statusCode: 200,
//     });

//   } catch (error) {
//     console.log("Error occurred during upload: ", error);
//     return NextResponse.json({
//       success: false,
//       message: "File upload failed",
//       statusCode: 500,
//     });
//   }
// }

// // TODO: Remove this before deploying in production
// // Example Response from the res
// // {
// //     "success": true,
// //     "message": "File uploaded to cloudinary",
// //     "data": {
// //         "asset_id": "10729cc174942407038b01ae0a66f27a",
// //         "public_id": "civic-buddy/nzl2nvt3euon1v8h8xdj",
// //         "version": 1758603752,
// //         "version_id": "8252f3c329306a752f7d8aab47d2d206",
// //         "signature": "0b83ec295cb45e0cd5db89022561914f04c1f9b8",
// //         "width": 3500,
// //         "height": 2333,
// //         "format": "jpg",
// //         "resource_type": "image",
// //         "created_at": "2025-09-23T05:02:32Z",
// //         "tags": [],
// //         "bytes": 587535,
// //         "type": "upload",
// //         "etag": "a66ca699527690ff6cbe7d2399cd2e39",
// //         "placeholder": false,
// //         "url": "http://res.cloudinary.com/dpcal7pun/image/upload/v1758603752/civic-buddy/nzl2nvt3euon1v8h8xdj.jpg",
// //         "secure_url": "https://res.cloudinary.com/dpcal7pun/image/upload/v1758603752/civic-buddy/nzl2nvt3euon1v8h8xdj.jpg",
// //         "asset_folder": "civic-buddy",
// //         "display_name": "nzl2nvt3euon1v8h8xdj",
// //         "original_filename": "file",
// //         "api_key": "142511827585245"
// //     },
// //     "statusCode": 200
// // }