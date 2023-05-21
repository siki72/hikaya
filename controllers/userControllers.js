import userModel from "../models/userModels.js";

// ------------------------------------------
//  Find a user by id
// ------------------------------------------
export const findUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
// ------------------------------------------
//  Get all users
// ------------------------------------------
export const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
