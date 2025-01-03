import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';


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


