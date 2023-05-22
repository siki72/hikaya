import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messagesRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes :
app.use("/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// midlleware error
app.use(function (err, req, res, next) {
  console.log("this err", err);
  console.error(err.stack);
  res.status(500).json({ error: "internal server error" });
});
const port = process.env.PORT;
const uri = process.env.ATLAS_URL;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection failed:", error.message));
