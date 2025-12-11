import crypto from "crypto";
import { z } from "zod";
import userModel from '../models/User.js';
import jwt from 'jsonwebtoken'


// ==== Zod validation =====
export const signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username should be at least 3 character long" })
    .max(25, { message: "Username should be maximum 25 character long" }),

  password: z
    .string()
    .min(8, { message: "Password should be at least 8 character long" })
    .max(25, { message: "Password should be at max 25 character long" }),
});


// ========= User Registration ============
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const validation = signupSchema.safeParse({ name, password });
    if (!validation.success) {
      const error = validation.error.issues[0]?.message || "Invalid Input";
      return res.status(400).json({ success: false, message: error });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    const saltValue = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .createHash("sha256")
      .update(saltValue + password)
      .digest("hex");
    const userData = {
      name,
      email,
      password: hashedPassword,
      saltvalue: saltValue
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    return res.json({ success: true, message: "User registered successfully"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      sucsess: false,
      message: err.message,
    });
  }
};

// =========== User login =========
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const hashedPassword = crypto
      .createHash("sha256")
      .update(user.saltvalue + password)
      .digest("hex");
    if (hashedPassword === user.password) {
     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
      return res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/" // Now the cookie will be persistant
      }).json({
        success: true,
        message: "SignIn successful",
        user: { name: user.name, email: user.email }
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ====== Admin Logout ========
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

