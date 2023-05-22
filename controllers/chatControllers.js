import chatModel from "../models/chatLodels.js";

// ------------------------------------------
//  Create à chat
// ------------------------------------------
export const createChat = async (req, res, next) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) return res.status(200).json(chat);
    const newChat = new chatModel({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------
//  getUserChats
// ------------------------------------------

export const findUserChats = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
    if (!chats) return res.status(203).json("no chats");
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------
//  find a Chat
// ------------------------------------------

export const findChat = async (req, res, next) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await chatModel.find({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
    if (!chat) return res.status(203).json("unfound chat");
  } catch (error) {
    next(error);
  }
};
