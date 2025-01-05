import { MessagesCollection } from '../db/models/message.js';

export const createMessage = async ({ message, to, from }) => {
  const newMessage = await MessagesCollection.create({
    message,
    to,
    from, 
  });
  return newMessage;
};

