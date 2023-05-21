import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: { type: String, required: true, minlength: 3, maxlength: 1024 },
    confirmation_code: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);
// create aour MODEL first param name of collection, second param our schema to creat document collectioin.
const userModel = mongoose.model("User", userSchema);

export default userModel;
