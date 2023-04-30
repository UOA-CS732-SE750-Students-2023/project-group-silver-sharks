import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import connectDB from "./db/mongoose.js";
import * as url from "url";
import path from "path";
import productRouter from "./routes/product.js";
import accountRouter from "./routes/account.js";
import "./auth.js";
import authRouter from "./routes/authentication.js";
import stripeRouter from "./routes/stripe.js";
import cors from 'cors';
import fileRouter from "./routes/file.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// handle the cors error
/*
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
*/

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

// register the routers
//app.use(router);
app.use(productRouter);
app.use(accountRouter);
app.use(authRouter);
app.use('/stripe', stripeRouter);

app.use(fileRouter);


app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });

  // this means that the front end when error handling can also access the message property
  // eg catch(error => console.log(error.message))
});

// Make the "public" folder available statically, all the images and static files we can serve
// to the front end from this folder directly
const dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(express.static(path.join(dirname, "./public")));

// Serve up the frontend's "dist" directory, if we're running in production mode.
if (process.env.NODE_ENV === "production") {
  console.log("Running in production!");

  // Make all files in that folder public
  app.use(express.static(path.join(dirname, "../frontend/dist")));

  // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
  app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server has started listening on port ${PORT}`);
});
