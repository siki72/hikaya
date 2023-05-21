import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// ------------------------------------------
//  hash password user
// ------------------------------------------

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.log("unable to hash a password ", error.message);
  }
};
