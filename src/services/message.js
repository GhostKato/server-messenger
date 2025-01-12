import { MessagesCollection } from '../db/models/message.js';


export const getAllMessages = async ({ userId }) => {

  const messages = await MessagesCollection.find({
    $or: [
      { from: userId },
      { to: userId }
    ]
  }).exec();

  return {
    data: messages,
  };
};


export const createMessage = async ({ message, to, from }) => {
  const newMessage = await MessagesCollection.create({
    message,
    to,
    from,
  });
  return newMessage;
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
