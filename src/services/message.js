import { MessagesCollection } from '../db/models/message.js';
import createHttpError from 'http-errors';
import { NotificationsCollection } from '../db/models/notification.js';
import mongoose from 'mongoose';


export const getMessagesById = async ({ fromId, toId }) => {
  if (!fromId || !toId) {
    throw new Error('Missing required parameters: from or to');
  }
  try {
    const messages = await MessagesCollection.find({
      $or: [
        { fromId, toId },
        { fromId: toId, toId: fromId },
      ]
    }).exec();
    return {
      messages,
    };
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
};


export const createMessage = async ({ message, toId, fromId }) => {
  if (!message || !toId || !fromId) {
    throw createHttpError(400, 'Missing required fields: message, to, or from');
  }
  try {
    const newMessage = await MessagesCollection.create({
      message,
      toId,
      fromId,
    });
    const newNotifications = await NotificationsCollection.create({
      messageId: newMessage._id,
      toId,
      fromId,
    });
    return { newMessage, newNotifications };
  } catch (error) {
    console.error('Error creating message:', error);
    throw createHttpError(500, 'Failed to create message');
  }
};


export const updateMessage = async (messageId, payload) => {
  try {
    const updatedMessage = await MessagesCollection.findByIdAndUpdate(
      messageId,
      payload,
      { new: true }
    );
    return updatedMessage || null;
  } catch (error) {
    console.error('Error updating message:', error);
    throw new Error('Failed to update message');
  }
};


export const deleteMessage = async (messageId) => {
  await NotificationsCollection.deleteMany({ messageId });
  return await MessagesCollection.findByIdAndDelete(messageId);
};


export const getNotifications = async () => {
  const notifications = await NotificationsCollection.find();
  if (!notifications.length) {
    return [];
  }
  return notifications;
};


export const deleteNotifications = async (notificationIds) => {
  try {
    const objectIds = notificationIds.map(id => new mongoose.Types.ObjectId(id));
    const result = await NotificationsCollection.deleteMany({
      _id: { $in: objectIds },
    });
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    throw new Error('Failed to delete notifications');
  }
};
