import { serverURL } from "../../config/urls.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BlogsEra - Blogging App API",
      version: "1.0.0",
      description:
        "<b>API documentation</b> for the backend of Blogging App built using MERN stack",
    },
    servers: [
      {
        url: serverURL,
      },
    ],

    // ❗ securitySchemes MUST be inside "components"
    components: {
      schemas: {
        fullName: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
            },
            middleName: {
              type: "string",
              nullable: true,
            },
            lastName: {
              type: "string",
            },
          },
        },
        userImg: {
          nullable: true,
          oneOf: [
            {
              type: "object",
              properties: {
                version: {
                  type: "string",
                  nullable: true,
                  example: "v123",
                },
                publicId: {
                  type: "string",
                  nullable: true,
                  example: "blog_app/images/profile_pics/123",
                },
              },
            },
            { type: "null" },
          ],
        },

        followUser: {
          type: "object",
          properties: {
            _id: { type: "string" },
            fullName: {
              $ref: "#/components/schemas/fullName",
            },
            userName: {
              type: "string",
            },
            profilePic: {
              $ref: "#/components/schemas/userImg",
            },
            thumbNail: {
              $ref: "#/components/schemas/userImg",
            },
            thumbNailToBeShown: {
              type: "boolean",
              nullable: true,
            },
            profilePicToBeShown: {
              type: "boolean",
              nullable: true,
            },
            gender: {
              type: "string",
              nullable: true,
            },
          },
        },
      },
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
        clientSecret: {
          type: "apiKey",
          in: "header",
          name: "x-client-secret",
        },
      },
    },
  },

  // Path to route docs
  apis: ["./src/docs/swagger/route_docs/**/*.js"],
};

export default swaggerOptions;
