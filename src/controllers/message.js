import createHttpError from "http-errors";
import { createMessage } from "../services/message.js";


export const createMessageController = async (req, res) => {
  const { message, to } = req.body;

  if (!message) {
    throw createHttpError(
      400,
      'Missing required field: message',
    );
  }

  const newMessage = await createMessage({
    message, to
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a message!',
    data: newMessage,
  });
};
