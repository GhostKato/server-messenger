import { MessagesCollection } from '../db/models/message.js';

export const createMessage = async (payload) => {
  const message = await MessagesCollection.create(payload);
  return message;
};
