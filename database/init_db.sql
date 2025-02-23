-- Delete taskmanager table if it already exists
DROP DATABASE IF EXISTS taskmanager;

-- Create taskmanager database
CREATE DATABASE taskmanager;

-- Connect to taskmanager database
\c taskmanager

-- Create users and tasks tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    isComplete BOOLEAN DEFAULT FALSE,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);

