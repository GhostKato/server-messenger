import { model, Schema } from 'mongoose';

const notificationSchema = new Schema(
  {
    messageId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'messages',
    },
    fromId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    toId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  },
);

export const NotificationsCollection = model('notifications', notificationSchema);

