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
  A preference object has the following attributes:
  ```
  {
    "categories":["cat_1", "cat_2", ...]
  }
  ```

  **Register and Login Object**
  A register object has the following attributes:
  ```
  {
  "name": STRING,
  "email": STRING,
   "password": STRING
  }
```
