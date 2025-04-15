import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config"
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

import path from "path";
import { fileURLToPath } from "url";

//Resolving dirname for ES Module.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//App config.
const app = express();
const port = 4000;

//Middleware.
app.use(express.json());
app.use(cors()); 

//DB Connection
connectDB();

//Api Endpoints.
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

//Use the frontend app.
app.use(express.static(path.join(__dirname,"/Frontend/dist")));

//Render frontend for any path.
app.use("*", (req,res) => {
    res.sendFile(path.join(__dirname,"/Frontend/dist/index.html"));
})

app.get("/", (req,res) => {
    res.send("API Working");
})

app.listen(port,() => {
    console.log(`Server Started On http://localhost:${port}`);
})