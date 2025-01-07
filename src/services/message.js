import { MessagesCollection } from '../db/models/message.js';

export const createMessage = async ({ message, to, from }) => {
  const newMessage = await MessagesCollection.create({
    message,
    to,
    from,
  });
  return newMessage;
};


export const deleteMessage = async (messageId, userId) => {
  const message = await MessagesCollection.findOneAndDelete({
    _id: messageId,
    userId,
  });

  return message;
};
