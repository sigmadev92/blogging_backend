import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Extract file extension (jpg, png, pdf, etc.)
    try {
      const ext = path.extname(file.originalname).replace(".", "");
      console.log("Arrived her for media");

      // Get user ID from request (make sure to attach it before upload)
      const userId = req.USER._id;

      // Determine file type
      const isImage = file.mimetype.startsWith("image/");
      const isPdf = file.mimetype === "application/pdf";

      // Folder paths
      const folder = "blog_app";
      let endFolder = "";
      if (isImage) {
        if (req.imgType === "profilePic") {
          endFolder = folder + "/images/profile_pics";
        } else if (req.imgType === "blog_thumbnail") {
          endFolder = folder + "/images/blog_thumbnails";
        } else {
          endFolder = folder + "/images/others";
        }
      } else if (isPdf) {
        endFolder = folder + "/pdfs";
      } else {
        endFolder = folder + "/others";
      }

      console.log(folder, endFolder);
      // Return Cloudinary upload params
      return {
        folder: endFolder,
        public_id: `${userId}`, // filename without extension
        format: ext, // keep original extension
        resource_type: isPdf ? "raw" : "image", // PDFs are 'raw', images are 'image'
        allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
      };
    } catch (error) {
      console.log(error);
    }
  },
});

const upload = multer({ storage });

export default upload;
