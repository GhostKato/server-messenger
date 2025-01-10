# Individual project: server messenger

## Description

This project is the server part of the system for storing, organizing and managing telephone numbers. The server provides an API that allows you to work effectively with the contact library, support user authorization, data synchronization, search, and also provides the ability to store metadata about contacts, filter and process requests. The server processes requests from front-end clients, processes them, and responds with the appropriate data.

## Features

1. **Authorization and authentication:**

   - Secure password change through tokens (JWT) for increased protection of personal libraries.
   - Quick authorization and login through google accounts.

2. **Contact Storage and Management:**

   - Contacts are stored in a database with data such as name, number, contact type, mail, and metadata.

3. **Filtering:**

   - Filter by favorite contacts.

4. **API for frontend interaction:**

   - Roouts for performing basic operations such as: registration, authorization, update, end of session, sending mail, new password.

   - `POST /auth/register` — registering a new user.
   - `POST /auth/login` — user authorization.
   - `POST /auth/logout` — log out of your account.
   - `POST /auth/refresh` — session update.
   - `POST /auth/send-reset-email` — sending mail for password reset.
   - `POST /auth/reset-pwd` — sending a new password.

- Roouts for performing basic operations with contacts such as: giving a contact, receiving a contact list and a filtered list, updating contact data, deleting a contact.

  - `POST /contacts` — adding a new contact.
  - `GET /contacts` — getting contact list and filtered list.
  - `PATСH /contacts/:id` — update contact data.
  - `DELETE /contacts/:id` — deleting a contact.

  - Roouts to perform basic user operations, such as updating user data, sending messages to mail.

  - `POST /user/:id` — updating user data.
  - `POST /user/send-message` — sending a message to mail.

5. **Safety:**

   - Using HTTPS for Secure Connections.
   - Encrypting user passwords using algorithms such as bcrypt.
   - Password recovery via JWT token, which increases the security of data.

## Architecture

1. **Database:**

   - **MongoDB**
   - Collections to store:
     - **users**: user data.
     - **contacts**: contact data.
     - **sessions**: data sessions.

2. **Storage in the cloud:**

   - Storing photos of users and contacts using cloud storage сloudinary.

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
   - Implementation of operations for contacts, users.
   - Creating mechanisms for loading and storing user and contact photos.

## Advantages of the server side

- **Scalability:** The server can handle large volumes of contacts and support thousands of simultaneous users.
- **Convenience:** API makes it easy to integrate the server with various front-end interfaces, mobile applications or other services.
- **Safety:** The use of modern encryption and data protection methods guarantees the security of both contacts and user data.

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
