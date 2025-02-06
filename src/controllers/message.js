import createHttpError from "http-errors";
import { getAllMessages, createMessage, updateMessage, deleteMessage } from "../services/message.js";
import { UsersCollection } from "../db/models/user.js";
import { MessagesCollection } from "../db/models/message.js";
import mongoose from 'mongoose';

export const getMessageController = async (req, res) => {

  const from = req.user._id;
  const { to } = req.query;

  try {
    const messages = await getAllMessages({ from, to });

    res.status(200).json({
      status: 200,
      message: 'Successfully found messages!',
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch messages!',
      error: error.message,
    });
  }
};


export const createMessageController = async (req, res) => {
  const { message } = req.body;
  const { to } = req.query;

  if (!message) {
    throw createHttpError(400, 'Missing required field: message');
  }

  if (!req.user || !req.user._id) {
    throw createHttpError(401, 'User is not authenticated');
  }

  const from = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(to)) {
    throw createHttpError(400, 'Invalid recipient ID');
  }

  const recipientExists = await UsersCollection.findById(to);
  if (!recipientExists) {
    throw createHttpError(404, 'Recipient user not found');
  }

  try {
    const newMessage = await createMessage({
      message,
      to,
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



export const updateMessageController = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const { _id } = req.user;

    const message = await MessagesCollection.findOne({ _id: messageId });
    if (!message) {
      console.log(`Message with ID ${messageId} not found.`);
      return next(createHttpError(404, 'Message not found'));
    }

    if (message.from.toString() !== _id.toString()) {

      console.log('User is not authorized to update this message.');
      return next(createHttpError(403, 'User not authorized to update this message'));
    }

    const updatedMessage = await updateMessage(messageId, _id, { ...req.body });
    if (!updatedMessage) {
      console.log('Failed to update message.');
      return next(createHttpError(500, 'Failed to update message'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated the message!',
      data: updatedMessage,
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return next(createHttpError(500, 'An error occurred while updating the message.'));
  }
};


export const deleteMessageController = async (req, res, next) => {
  const { messageId } = req.params;
  const { _id } = req.user;

  const message = await deleteMessage(messageId, _id);

  if (!message) {
    next(createHttpError(404, 'Message not found'));
    return;
  }

  res.status(204).send();
};
