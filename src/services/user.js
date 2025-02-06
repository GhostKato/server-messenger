import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';


export const updateUser = async (payload) => {
  try {

    const user = await UsersCollection.findOne({ _id: payload.userId });

    if (!user) {
      throw new Error('User not found');
    }

    let encryptedPassword = user.password;

    if (payload.password) {
      encryptedPassword = await bcrypt.hash(payload.password, 10);
    }

    const updatedUser = await UsersCollection.findOneAndUpdate(
      { _id: payload.userId },
      {
        ...payload,
        password: encryptedPassword,
      },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


export const getUsers = async ({ id }) => {
  try {

    const excludedUserId = new mongoose.Types.ObjectId(id);

    const users = await UsersCollection.find({ _id: { $ne: excludedUserId } });

    if (!users || users.length === 0) {
      console.log('No other users found.');
      throw createHttpError(404, 'No other users found');
    }

    return users;
  } catch (error) {
    console.error('Помилка отримання користувачів:', error.message);
    throw createHttpError(500, 'Internal Server Error');
  }
};



