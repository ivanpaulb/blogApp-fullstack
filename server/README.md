
# Backend API for Blog Application 

A RESTful backend API for a blog application built using **Node.js**, **Express.js**, and **MongoDB**. 

## Tech Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Tokens)  
- bcryptjs (Password Hashing)  
- dotenv (Environment Variables)

---

## Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=4000
MONGO_URI=<Your Mongodb URI>
JWT_SECRET=your_jwt_secret
```

---

## Test Credentials

### Regular User

- **Email:** test@mail.com  
- **Username:** testuser  
- **Password:** test1234  

### Admin User

- **Email:** admin@mail.com  
- **Username:** admin  
- **Password:** admin1234 

> To make the user an admin, set `isAdmin: true` when registering a new user.

---

## Authentication

All protected routes require a JWT in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

---

## User Roles

| Role   | Capabilities                                                        |
|--------|---------------------------------------------------------------------|
| All Users   | Register, login, view all posts and comments                           |
| User   | create/edit/delete own posts/comments             |
| Admin  | Delete any post or comment                                         |

---

## API Endpoints

### User Routes

| Method | Endpoint             | Description                  | Auth |
|--------|----------------------|------------------------------|------|
| POST   | `/users/register` | Register a new user          | ❌   |
| POST   | `/users/login`    | Log in and get JWT token     | ❌   |

---

### Blog Post Routes

| Method | Endpoint             | Description                            | Auth           |
|--------|----------------------|----------------------------------------|----------------|
| GET    | `/posts/all`         | Get all blog posts                     | ❌             |
| GET    | `/posts/:id`         | Get a specific blog post               | ❌             |
| POST   | `/posts`             | Create a new post                      | ✅ (User)       |
| PATCH  | `/posts/updatePost/:id`| Update your own post                 | ✅ (User)       |
| DELETE | `/posts/deletePost/:id`| Delete own (user) or any post (admin only)  | ✅ (User/Admin) |

---

### Comment Routes

| Method | Endpoint                  | Description                                | Auth           |
|--------|---------------------------|--------------------------------------------|----------------|
| GET    | `/comments/:postId`       | Get all comments for a post                | ❌             |
| POST   | `/comments/addComment/:postId`   | Add a comment to a blog post        | ✅ (User)       |
| DELETE | `/comments/deleteComment/:commentId`  | Delete own or any comment (admin only) | ✅ (User/Admin) |


