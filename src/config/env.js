import { config } from "dotenv";

config({ quiet: true });

const PORT = process.env.PORT || 3003;
const DB_NAME = process.env.DB_NAME;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const CLIENT_URL = process.env.CLIENT_URL;
const NODE_ENV = process.env.NODE_ENV;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export {
  PORT,
  MONGO_URI,
  DB_NAME,
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
  CLIENT_URL,
  NODE_ENV,
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
};
