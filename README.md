WealthWave-Backend
WealthWave-Backend is the backend service for the WaveWealth personal finance tracker. This open-source API, built with Express and PostgreSQL, handles data storage, and communication with the front-end application, providing a robust foundation for managing personal finance data.

Features
RESTful API: Provides endpoints for recieving data about expenses, and income.
Express Framework: Fast and minimalist web framework for building the API.
PostgreSQL Database: Reliable and scalable database management for storing financial data.

Getting Started
Prerequisites
Node.js (version 14 or higher)
PostgreSQL (version 12 or higher)

Installation
Clone the repository:
Copy code
git clone https://github.com/GreenTree00/WealthWave-Backend.git

Navigate to the project directory:
Copy code
cd WealthWave-backend

Install dependencies:
Copy code
npm install

Set up the PostgreSQL database:
Create a new database in PostgreSQL.
Run the database migrations to set up the required tables:
code for this is located in the queries.sql file

Configure environment variables found in .env.example:
Create a .env file in the root directory and add the following variables:
you will need to fill in all pertinate information related to your database

Run the sever:
Copy code
node server.js or nodemon server.js
Access the API: The server will be running on http://localhost:3000.

API Documentation
Detailed API documentation can be found in the docs folder.

Contributing
We welcome contributions from the community! Feel free to open issues, submit pull requests, or suggest new features.

License
This project is licensed under the MIT License.