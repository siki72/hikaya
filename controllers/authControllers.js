import userModel from "../models/userModels.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/function.js";
import argon2 from "argon2";
const maxAge = 3 * 24 * 60 * 60 * 1000;

// ------------------------------------------
//       Register
// ------------------------------------------
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const confirmation_code = (
    Math.floor(Math.random() * 90000) + 10000
  ).toString();
  const role = "guest";

  try {
    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json("user already exist, please login");

    if (!name || !email || !password)
      return res.status(400).json("All fields ares required");

    if (!validator.isEmail(email))
      return res.status(400).json("email mus be a valid email");

    if (!validator.isStrongPassword(password))
      return res.status(400).json("password mus be a strong password");

    // define user befor add user into datable with save() method
    user = userModel({ name, email, password, confirmation_code, role });
    // redifine hashed password befor add user
    user.password = await hashPassword(password);
    const resp = await user.save();
    jwt.sign(
      {
        id: resp._id,
        name: resp.name,
        email: resp.email,
      },
      process.env.SECRET_KEY,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("karibu", token, {
            httpOnly: true,
            maxAge,
          })
          .json({
            id: resp._id,
            name: resp.name,
            email: resp.email,
          });
      }
    );
    res.status(201);
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------
//       login
// ------------------------------------------

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(404).json("Invalid email or password");
    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword)
      return res.status(400).json("Invalid email or password");
    jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("karibu", token, {
            httpOnly: true,
            maxAge,
          })
          .json({
            id: user._id,
            name: user.name,
            email: user.email,
          });
      }
    );
    res.status(200);
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------
//       Get profile
// ------------------------------------------

export const getProfile = async (req, res, next) => {
  const { karibu } = req.cookies;
  try {
    if (karibu) {
      jwt.verify(
        karibu,
        process.env.SECRET_KEY,
        {},
        async (err, karibuData) => {
          if (err) throw err;
          const { id, name, email } = karibuData;
          res.status(200).json({ id, name, email });
        }
      );
    } else {
      res.status(204).json("no cookie");
    }
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------
//       logout
// ------------------------------------------

export const logoutUser = async (req, res, next) => {
  try {
    res
      .status(202)
      .clearCookie("karibu", { httpOnly: true })
      .json("cookie cleared");
  } catch (error) {
    next(error);
  }
};
