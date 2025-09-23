import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

/**
 * Upload file to Cloudinary
 * @param {File} file - The file to upload
 * @param {string} folderName - The folder name in Cloudinary (optional)
 * @param {Object} options - Additional upload options (optional)
 * @returns {Promise<string>} - Returns the secure URL of the uploaded file
 */
export async function uploadToCloudinary(file, folderName = "uploads", options = {}) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
          ...options, // Spread any additional options
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    // Return the secure URL
    return result.secure_url;

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

/**
 * Upload file to Cloudinary and return full response
 * @param {File} file - The file to upload
 * @param {string} folderName - The folder name in Cloudinary (optional)
 * @param {Object} options - Additional upload options (optional)
 * @returns {Promise<Object>} - Returns the full Cloudinary response
 */
export async function uploadToCloudinaryWithFullResponse(file, folderName = "uploads", options = {}) {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folderName,
          ...options,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return result;

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

// TODO: remove before deploying in prod
// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY,
// })

// export async function POST(req, res) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file");
//     const folderName = formData.get("folderName");

//     if (!file) {
//       NextResponse.json({
//         msg: "File not found",
//         statusCode: 404,
//       });
//     } else {
//       // main cloudinary upload code
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const res = await new Promise<any>((res, rej) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             folder: folderName,
//           },
//           (error, result) => {
//             if (error) rej(error);
//             else res(result);
//           }
//         );
//         uploadStream.end(buffer);
//       });

//       return NextResponse.json({
//         msg: "File uploaded to cloudinary",
//         res,
//         statusCode: 200,
//       });
//     }
//   } catch (error) {
//     NextResponse.json({
//       msg: "Error in fileupload route",
//       statusCode: 500,
//     });
//   }
// }
