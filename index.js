import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
import messageRoute from "./routes/messageRoute.js";
import aboutMeRoute from "./routes/aboutMeRoute.js";
import experienceRoute from "./routes/experienceRoute.js";
import workRoute from "./routes/workRoute.js";
import latestPostRoute from "./routes/latestPostRoute.js";
import pricingPlanRoute from "./routes/pricingPlanRoute.js";

import clientsRoute from "./routes/clientsRoute.js";

import cors from "cors";

dotenv.config();

const app = express();

connectDB();
app.use(cors());

// middleware

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/updateAboutMe", aboutMeRoute);
app.use("/api/v1/updateServices", serviceRoute);
app.use("/api/v1/updateCompletion", experienceRoute);
app.use("/api/v1/updateWork", workRoute);
app.use("/api/v1/updatePricingPlan", pricingPlanRoute);
app.use("/api/v1/updateClientReview", clientsRoute);
app.use("/api/v1/updatePost", latestPostRoute);
app.use("/api/v1", messageRoute);





app.get("/", (req, res) => {
  res.send({ message: "welcome to ecommerce app" });
});

// port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on ${process.env.DEV_MODE} port ${PORT}`);
});
