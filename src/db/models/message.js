import { model, Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MessagesCollection = model('message', messageSchema);
