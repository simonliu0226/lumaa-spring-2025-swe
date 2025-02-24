# Task Management Web Application

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- [PostgreSQL](https://www.postgresql.org/download/) - The database used
- [Node.js](https://nodejs.org/en/) - The runtime environment for the backend

### Setting Up the Database

To set up and initialize the database:

1. **Install PostgreSQL**: Ensure that PostgreSQL is installed on your machine.
2. **Log into PostgreSQL**: Open your command line tool, and log into the PostgreSQL account by running:
   ```bash
   psql -U postgres
  Replace postgres with the username of your PostgreSQL account. 
3. **Run the Initialization Script**: Navigate to the directory containing init_db.sql and run the following command to create your database and tables:
   \i path/to/init_db.sql
  Replace path/to/init_db.sql with the actual path to your SQL script.
4. **Set Environment Variables**: Inside the backend directory, update the .env file with your database credentials to match your local setup.

### Running the Backend
To get the backend server running:

1. **Navigate to Backend Directory**:
   ```bash
   cd path/to/backend
2. **Install Dependencies**:
   ```bash
   npm install
3. **Start the Server**:
   ```bash
   npm run start

### Running the Frontend
To run the frontend application:
1. **Navigate to Frontend Directory**:
   ```bash
   cd path/to/frontend
2. **Install Dependencies**:\i path/to/init_db.sql
   ```bash
   npm install
3. **Start the Application**:
   ```bash
   npm run dev
4. **Update Environment Variables**:
   Ensure the .env file in the frontend directory is updated to match the backend port, especially if it's not running on the default HTTP port (e.g., 3000).

### Usage
Here's how to use this application:
- **Logging In**: Navigate to /login to access the login form.
- **Registering**: Navigate to /register to register a new account.
- **Task Management**: Navigate to / to view and update the tasks.

### Video Demonstration:
- [Video Link](https://youtu.be/cJlb1U8bEPw)

### Salary Expectations per Month
I am expecting $6,000 per month.