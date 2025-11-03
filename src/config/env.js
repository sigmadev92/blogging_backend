import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3003;
const DB_NAME = process.env.DB_NAME;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const CLIENT_URL = process.env.CLIENT_URL;
const NODE_ENV = process.env.NODE_ENV;
export {
  PORT,
  MONGO_URI,
  DB_NAME,
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
  CLIENT_URL,
  NODE_ENV,
};
