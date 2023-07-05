# News Aggregator API
The News Aggregator API is a RESTful API built with MongoDB, Node.js, and Express.js. It allows users to register with *Email and Password*, view articles based on *news categories* or different *media houses*

# Prerequisites
To run this project, you need to have the following software installed on your machine:
* Node.js 
* npm (Node Package Manager)
* MongoDB

# Installation
1. Clone the repository to your local machine:<br />
   ```git clone https://github.com/AbhaySingh5349/Backend-projects.git```
2. Install the dependencies:<br />
   ```npm install```

# Usage
1. Start the API server:<br />
   ``` npm start ```
2. The server will start running on<br />
   ``` http://localhost:3000 ```

# API Endpoints
* POST /auth/register => Register as new user.
* POST /auth/login => Login with email and password.
* GET /news => Retrieves news based on logged-in users' news preferences or from different media houses.
* PUT /preferences => Add news categories for which the user wants to see news articles.

# Request and Response Format

  **Prefernce Object**
  
  ```
  {
    "categories":["cat_1", "cat_2", ...]
  }
  ```

  **Register and Login Object**
 
  ```
  {
  "name": STRING,
  "email": STRING,
   "password": STRING
  }
```

  **Login Response**
  
  ```
  {
    "user_obj": {
        "user": {
            "_id": "64a406069c2be08f5deec3ed",
            "name": "abc",
            "email": "abc@gmail.com",
            "password": "$2b$12$M2g5YGt9pIwfYYmHY2HrDuP0NH7KJwAFIGL6k1VmfU4ZZjghPNWF2",
            "createdAt": "2023-07-04T11:44:06.171Z",
            "__v": 0
        },
        "message": "User logged in successfully!"
    },
    "token": {
        "access": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGE0MDYwNjljMmJlMDhmNWRlZWMzZWQiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjg4NTM4NTM4LCJleHAiOjE2ODg1NDIxMzh9.2UrKkCbMGLkxI8QPD92CWb59kRimNeD5wcCVP_bJYxo",
            "expires": "2023-07-05T07:28:58.000Z"
        }
    }
}

```
   
