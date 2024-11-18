# BBPRIME Content Management System

https://github.com/bradtraversy/mern-auth.git

It includes the following:

- Backend API with Express & MongoDB
- Routes for auth, logout, register, profile, update profile
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints
- Custom middleware to check JSON web token and store in cookie
- Custom error middleware
- React frontend to register, login, logout, view profile, and update profile
- React Bootstrap UI library
- React Toastify notifications

## Usage


### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = '{Put something here}'
```

Change the JWT_SECRET to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
npm install @mui/material @emotion/react @emotion/styled
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run start

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
 

docker exec -it bbprime-ui_bbprime-mongo_1 bash
mongosh --port=20717
use bbprime



db.users.update({"username": 'phile16'}, {$set:{"isVerified": "true"}})
db.users.update({"username": 'phile16'}, {$set:{"expires": undefined}})
db.users.update({"username": 'phile16'}, {$set:{"isAdmin": "true"}})
