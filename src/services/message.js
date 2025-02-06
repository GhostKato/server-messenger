import { MessagesCollection } from '../db/models/message.js';
import createHttpError from 'http-errors';


export const getAllMessages = async ({ from, to }) => {
  // Перевірка на наявність відправника та отримувача
  if (!from || !to) {
    throw new Error('Missing required parameters: from or to');
  }

  try {
    const messages = await MessagesCollection.find({
      $or: [
        { from, to },
        { to, from }, // Запит на повідомлення від отримувача до відправника
      ]
    }).exec();

    return {
      data: messages,
    };
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
};


export const createMessage = async ({ message, to, from }) => {
  if (!message || !to || !from) {
    throw createHttpError(400, 'Missing required fields: message, to, or from');
  }

  try {
    const newMessage = await MessagesCollection.create({
      message,
      to,
      from,
    });

    return newMessage;
  } catch (error) {
    console.error('Error creating message:', error);
    throw createHttpError(500, 'Failed to create message');
  }
};


export const updateMessage = async (messageId, userId, payload, options = {}) => {
  try {
    const updatedMessage = await MessagesCollection.findOneAndUpdate(
      { _id: messageId, from: userId },
      payload,
      {
        new: true,
        ...options,
      }
    );

    if (!updatedMessage) return null;

    return {
      message: updatedMessage,
      isNew: Boolean(updatedMessage?._id),
    };
  } catch (error) {
    console.error('Error updating message:', error);
    throw new Error('Failed to update message');
  }
};


export const deleteMessage = async (messageId, userId) => {
  const message = await MessagesCollection.findOneAndDelete({
    _id: messageId,
    from: userId
  });

  return message;
};
