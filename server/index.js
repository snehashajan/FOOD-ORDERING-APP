import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {authController} from "./controllers/authController.js"
import {productController } from "./controllers/productController.js";
import { uploadController } from "./controllers/uploadController.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = 8000;

app.use("/images", express.static('public/images'))
app.use("/auth", authController);
app.use("/product", productController);
app.use("/upload", uploadController)

const start = ()=>{
mongoose.connect(process.env.MONGO);
console.log("Connected to db") 
}
start();

app.listen(PORT, ()=>{
    console.log(`Connected to port ${PORT}`);
})