import express from "express";
import { verifyToken, verifyTokenAdmin } from "../middlewares/verifyToken.js";
import Product from "../models/Product.js";

export const productController = express.Router();

productController.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Product.find(req.query);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

productController.get("/find/:id",  async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(500).json({ msg: "No product with such id !" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

productController.post("/", verifyTokenAdmin, async(req,res)=>{
    try{
        const newProduct = await Product.create({...req.body});
        return res.status(201).json(newProduct)

    } catch (error){
        console.log({msg : msg.error})
    }
})
