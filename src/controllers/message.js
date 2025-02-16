import createHttpError from "http-errors";
import { getAllMessages, createMessage, updateMessage, deleteMessage } from "../services/message.js";
import { UsersCollection } from "../db/models/user.js";
import mongoose from 'mongoose';
import { sendMessageToClients } from '../utils/socket.js';

export const getMessageController = async (req, res) => {

  const fromId = req.user._id;
  const { toId } = req.params;

  try {
    const messages = await getAllMessages({ fromId, toId });
    
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
  const { toId } = req.params;

  if (!message) {
    throw createHttpError(400, 'Missing required field: message');
  }

  if (!req.user || !req.user._id) {
    throw createHttpError(401, 'User is not authenticated');
  }

  const fromId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(toId)) {
    throw createHttpError(400, 'Invalid recipient ID');
  }

  const recipientExists = await UsersCollection.findById(toId);
  if (!recipientExists) {
    throw createHttpError(404, 'Recipient user not found');
  }

  try {
    const newMessage = await createMessage({
      message,
      toId,
      fromId,
    });

    sendMessageToClients('newMessage', newMessage);

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
    const { message } = req.body;

    if (!message) {
      return next(createHttpError(400, 'Missing required field: message'));
    }

    const updatedMessage = await updateMessage(messageId, { message });

    if (!updatedMessage) {
      return next(createHttpError(404, 'Message not found or update failed'));
    }

    sendMessageToClients('updateMessage', updatedMessage);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated the message!',
      updatedMessage,
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return next(createHttpError(500, 'An error occurred while updating the message.'));
  }
};

export const deleteMessageController = async (req, res, next) => {
  const { messageId } = req.params;

  try {
    const message = await deleteMessage(messageId);

    if (!message) {
      return next(createHttpError(404, 'Message not found'));
    }

    sendMessageToClients('deleteMessage', messageId);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting message:', error);
    next(createHttpError(500, 'An error occurred while deleting the message'));
  }
};
