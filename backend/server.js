import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import connectDB from "./db/mongoose.js";
import router from "./routes/example.js";

const app = express();

// Connect to database
connectDB();

// Swagger config options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
      description: "Test API with Swagger",
    },
  },
  apis: ["./routes/*.js"],
};

// Init Swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve API documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server has started listening on port ${PORT}`);
});
