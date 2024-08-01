import express from "express";
import dotenv from "dotenv" // require package
import mongoose from "mongoose";
import methodOverride from "method-override";
import logger from "morgan";

import authController from "./controllers/auth.js";
// import authController from "auth"


dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));


// Set the port from environment variable or default to 3000
const port = process.env.PORT || "3000";



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(logger("dev"));

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.use("/auth", authController);



app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
