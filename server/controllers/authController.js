import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
//User is imported from model

export const authController = express.Router();

authController.post("/register", async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
      throw new Error("Email is already taken. Try other one !");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    //await newUser.save();

    const { password, ...other } = newUser._doc;
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );
    return res.status(201).json({ other, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

authController.post("/login", async (req, res) => {
  try {
    const Isemail = await User.findOne({ email: req.body.email });
    if (!Isemail) {
      throw new Error("Username or Password is incorrect");
    }

    const comparePass = await bcrypt.compare(
      req.body.password,
      Isemail.password
    );
    if (!comparePass) {
      throw new Error("User credientials are wrong");
    }
    const { password, ...other } = Isemail._doc;
    const token = jwt.sign(
      {
        id: Isemail._id,
        isAdmin: Isemail.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );
    return res.status(201).json({ other, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
