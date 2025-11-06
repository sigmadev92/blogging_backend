import { serverURL } from "../../config/urls.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "BlogsEra - Blogging App API",
      version: "1.0.0",
      description:
        "<b>API documentation</b> for the backend of Blogging App built using MERN stack",
    },
    servers: [
      {
        url: serverURL, // Backend server URL
      },
    ],
  },
  apis: ["./src/docs/swagger/route_docs/**/*.js"],
  // Path to your route files
};
export default swaggerOptions;
