import createHttpError from 'http-errors';
import { getUsers, updateUser } from '../services/user.js';
import { UsersCollection } from '../db/models/user.js';
import { saveImage } from '../utils/saveImage.js';
import { BASE_URL_USER_PHOTO } from '../constants/index.js';


export const updateUserController = async (req, res, next) => {

  try {
    const { userId } = req.params;

    const user = await UsersCollection.findOne({ _id: userId });
    if (!user) {
      console.log(`User with ID ${userId} not found.`);
      throw createHttpError(404, 'User not found');
    }

    const newPhoto = req.file;
    let photoUrl;

    if (newPhoto) {
      photoUrl = await saveImage(newPhoto);
    } else {

      photoUrl = req.body.photo || user.photo || BASE_URL_USER_PHOTO;
    }

    const updatedUser = await updateUser({
      userId,
      ...req.body,
      photo: photoUrl,
    });

    if (!updatedUser) {
      console.log('Failed to update user.');
      throw createHttpError(500, 'Failed to update user');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated the user!',
      data: {
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
      },
    },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    next(createHttpError(500, 'An error occurred while updating the user.'));
  }
};


export const getUsersController = async (req, res) => {

  const users = await getUsers({id: req._id});

  res.status(200).json({
    status: 200,
    message: 'Successfully found users!',
    data: users,
  });
};



