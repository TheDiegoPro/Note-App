#!/bin/bash

# Exit on error
set -e

# Define directories
BACKEND_DIR="./Backend"
FRONTEND_DIR="./Frontend"

# Setup backend
echo "Setting up backend..."

# Change to backend directory
cd $BACKEND_DIR

# Install backend dependencies
npm install

# Run database migrations or schema setup if needed
# Example: Run sequelize migrations
 npx sequelize-cli db:migrate

# Go back to root directory
cd ..

# Setup frontend
echo "Setting up frontend..."

# Change to frontend directory
cd $FRONTEND_DIR

# Install frontend dependencies
npm install

# Go back to root directory
cd ..

echo "Setup complete. You can now run the backend and frontend separately."
