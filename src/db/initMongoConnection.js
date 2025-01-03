import mongoose from 'mongoose';
import { env } from '../utils/env.js';
import { MONGO_DB_ENV_VARS } from '../constants/index.js';

export const initMongoConnection = async () => {

  const user = MONGO_DB_ENV_VARS.MONGODB_USER;
  const password = MONGO_DB_ENV_VARS.MONGODB_PASSWORD;
  const url = MONGO_DB_ENV_VARS.MONGODB_URL;
  const mongodb = MONGO_DB_ENV_VARS.MONGODB_DB;

  const connectionLink = `mongodb+srv://${env(user)}:${env(
    password)}@${env(url)}/${env(
    mongodb,
  )}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(connectionLink);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.log('Error while setting up mongo connection', err);
    throw err;
  }
};
