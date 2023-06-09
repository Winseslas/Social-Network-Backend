# Social Network Backend

This is the backend for a social network application built with Node.js and MySQL. It allows to  :
    * User management 
    * Publications. 
    * Comments.
    * Likes, etc.

# Installation

To install the application, follow these steps:

1. Clone this repository to your local machine.
2. Install Node.js and MySQL if you haven't already.
3. Run npm install to install dependencies.
4. Create a .env file in the root directory and add your database credentials as follows:

    * DB_HOST=localhost
    * DB_USER=root
    * DB_PASSWORD=password
    * DB_NAME=social_network

5. Run npm run db:init to create the necessary database and tables.
6. Run npm start to start the server.


# Usage

The server will be running on http://localhost:3030.
The following API endpoints are available:

# Authentication
    * POST /api/auth/register: Create a new user account.
    * POST /api/auth/login: Log in to an existing user account.


# Posts
    * GET /api/post: Get all posts.
    * GET /api/post/:id: Get a specific post by ID.
    * POST /api/post: Create a new post.
    * PUT /api/post/:id: Update an existing post.
    * DELETE /api/post/:id: Delete a post.

# License
This project is licensed under the MIT License.

# Contribute
If you want to contribute to the project, you can create an issue or a pull request on the Git repository.

# Acknowledgments
    * Express
    * MySQL
    * dotenv
Feel free to modify this template to fit the specifics of your application.