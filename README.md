# Individual project: server messenger

## Description

This project is the server part of the messenger, in which you can send messages to other users. The server provides an API that allows you to communicate, support user authorization, data synchronization, search, and also provides the ability to store messages, user data and process requests. The server processes requests from clients, processes them and responds with the appropriate data.

## Features

1. **Authorization and authentication:**

   - Secure password change through tokens (JWT) for increased protection of personal libraries.
   - Quick authorization and login through google accounts.

2. **Storage and management messages:**

   - Messages are stored in a database with such data, message text, sender, recipient and metadata.

3. **API for frontend interaction:**

   - Roouts for performing basic operations such as: registration, authorization, update, end of session, sending mail, new password.

   - `POST /auth/register` — registering a new user.
   - `POST /auth/login` — user authorization.
   - `POST /auth/logout` — log out of your account.
   - `POST /auth/refresh` — session update.
   - `POST /auth/send-reset-email` — sending mail for password reset.
   - `POST /auth/reset-pwd` — sending a new password.

  - Roouts for performing basic operations with messages, such as: sending a message, receiving a list of messages, updating a message, deleting a message.

  - `POST /message` — adding a new message.
  - `GET /message` — getting message list.
  - `PATСH /message/:id` — update  message.
  - `DELETE /message/:id` — deleting a message.

  - Roouts to perform basic user operations, such as updating user data.

  - `POST /user/:id` — updating user data. 

4. **Safety:**

   - Using HTTPS for Secure Connections.
   - Encrypting user passwords using algorithms such as bcrypt.
   - Password recovery via JWT token, which increases the security of data.

## Architecture

1. **Database:**

   - **MongoDB**
   - Collections to store:
     - **users**: user data.
     - **message**: message data.
     - **sessions**: data sessions.

2. **Storage in the cloud:**

   - Store user photos with cloud storage.

3. **Middleware:**

   - Using middleware for user authentication, input validation, and error handling.

4. **Technologies and tools:**
   - **Node.js**: The server side runs on Node.js, which allows you to handle asynchronous requests and provides high performance.
   - **Express.js**: Bridge for creating RESTful API, provides simple and convenient methods for routing requests.
   - **JWT (JSON Web Tokens)**: for password recovery.
   - **Mongoose (для MongoDB)** to work with the database.

## Stages of development

1. **API Design:**

   - Develop schemas for the database.
   - Description of required API endpoints and their parameters.
   - Middleware development for authentication and error handling.

2. **Development of functionality:**
   - Performing operations for messages, users.
   - Creating mechanisms for loading and storing user photos.

## Advantages of the server side

- **Scalability:** The server can handle large volumes of contacts and support thousands of simultaneous users.
- **Convenience:** API makes it easy to integrate the server with various front-end interfaces, mobile applications or other services.
- **Safety:** The use of modern encryption and data protection methods guarantees the security of both messages and user data.

## Technologies used

1. **Programming languages:**

   - **JavaScript**

2. **Frameworks and Libraries:**

   - **Node.js**
   - **Express.js**
   - **JWT**
   - **Mongoose**
   - **bcrypt**

3. **Database:**

   - **MongoDB**

4. **Safety:**

   - **OAuth 2.0**
   - **JWT**
   - **HTTPS**
     **bcrypt**

5. **Other technologies:**
   - **Git**
   - **Cloudinary**

---

The project is developing a server for managing contacts through the API, with support for authorization through JWT and Google. It provides contact storage in MongoDB, filtering, data updates and password recovery. For security, HTTPS, bcrypt and cloud storage of photos via Cloudinary are used. The project is focused on scalability, ease of integration and a high level of data protection.
