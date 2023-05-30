import messageModel from "../models/messageModels.js";
// ------------------------------------------
//  create Message
// ------------------------------------------

export const createMessage = async (req, res, next) => {
  const { chatId, senderId, text } = req.body;

  try {
    if (text !== "") {
      const message = new messageModel({
        chatId,
        senderId,
        text,
      });
      const response = await message.save();

      res.status(201).json(response);
    } else {
      return res.status(203).json("no text");
    }
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------
//  Get Messages
// ------------------------------------------
export const getMessages = async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------
//  Update Messages
// ------------------------------------------

export const markReadMessages = async (req, res, next) => {
  const { chatId } = req.body;
  try {
    await messageModel.updateMany({ chatId: chatId }, { lu: true });
    const updatedMessages = await messageModel.find({ chatId });
    res.status(200).json(updatedMessages);
  } catch (error) {
    next(error);
  }
};
