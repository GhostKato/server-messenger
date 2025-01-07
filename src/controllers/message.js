import createHttpError from "http-errors";
import mongoose from "mongoose"; // Для перетворення ObjectId
import { createMessage, deleteMessage } from "../services/message.js";
import { UsersCollection } from "../db/models/user.js"; // Додайте модель користувача, якщо ще не підключена

export const createMessageController = async (req, res) => {
  const { message, to } = req.body;

  // console.log(req.body);
  // console.log(to);
  // console.log(message);


  if (!message) {
    throw createHttpError(400, 'Missing required field: message');
  }

  // Перевірка на наявність користувача, що надсилає повідомлення
  if (!req.user || !req.user._id) {
    throw createHttpError(401, 'User is not authenticated');
  }

  const from = req.user._id;
  // console.log(req.user._id);

  // Перетворення ID отримувача на ObjectId
  let toUserId;
  try {
    toUserId = new mongoose.Types.ObjectId(to);

  } catch (error) {
    console.log(toUserId);
    throw createHttpError(400, 'Invalid recipient ID');
  }

  // Перевірка, чи існує користувач, якому надсилається повідомлення
  const recipientExists = await UsersCollection.findById(toUserId);
  if (!recipientExists) {
    throw createHttpError(404, 'Recipient user not found');
  }

  try {
    const newMessage = await createMessage({
      message,
      to: toUserId,
      from,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a message!',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error creating message:', error);
    throw createHttpError(500, 'Internal Server Error');
  }
};


export const deleteMessageController = async (req, res, next) => {
  const { messageId } = req.params;
  const contact = await deleteMessage(messageId, req.user._id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
