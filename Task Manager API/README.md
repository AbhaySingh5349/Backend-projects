# Task Manager API
The Task Manager API is a RESTful API built with Node.js and Express.js. It allows users to manage tasks by performing CRUD operations (Create, Read, Update, Delete). Tasks have attributes such as Id, Description, Completion Status, and Priority Level.

# Prerequisites
To run this project, you need to have the following software installed on your machine:
* Node.js (version 12 or higher)
* npm (Node Package Manager)

# Installation
1. Clone the repository to your local machine:
   git clone https://<i></i>github.com/AbhaySingh5349/Backend-projects.git
2. Install the dependencies:
   npm start

# Usage
1. Start the API server:
2. The server will start running on http://localhost:3000

# API Endpoints
* GET /tasks => Retrieves all tasks.
* GET /tasks/:id => Retrieves a single task by its ID.
* GET /tasks/?completed_status=true => Retrieve tasks that are completed and sort them based on the creation date
* GET /tasks/priority/:level => Retrieve tasks based on priority level (high, medium, low)
* POST /tasks => Create a new task.
* PUT /tasks/:id => Update an existing task by its ID.
* DELETE /tasks/:id => Delete a task by its ID.

  # Request and Response Format

  **Task Object**
  A task object has the following attributes:
  {
      "id": NUMBER,
      "description": STRING,
      "is_completed": BOOLEAN,
      "priority": STRING,
      "date": STRING
    }

  **Request Format**
  * **POST** and **PUT** requests require a request body in JSON format. The request body should contain the task attributes (id, description, completed status, and priority).
 
  **Response Format**
  * All successful responses will have a status code of 200 OK, unless otherwise specified.
  * The response body will be in JSON format, containing the requested data or the created/updated task object
  * If an error occurs, the response will have an appropriate error status code (e.g., 400 Bad Request) and an error message in the response body.
