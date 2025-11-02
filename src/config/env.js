import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3003;
const DB_NAME = process.env.DB_NAME;
const MONGO_URI = process.env.MONGO_URI;

export { PORT, MONGO_URI, DB_NAME };
