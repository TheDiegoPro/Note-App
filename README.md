
# Notes App

This is a Simple Notes Application built with React,TailwindCSS,daisyUI for the frontend and Express,Sqlite,Sequelize for the backend. It allows users to create, edit, delete, archive, and unarchive notes. Users can also filter notes by tags and manage them efficiently.


## Features

- Create, Edit, Delete Notes: Manage your notes with full CRUD functionality.
- Archive and Unarchive Notes: Keep track of important notes by archiving them.
- Tag Filtering: Filter notes based on tags.
- Responsive design with Tailwind CSS and DaisyUI



## Tech Stack

Backend:
- Node.js
- Express (4.19.2)
- Sequelize (6.37.3 for ORM)
- SQLite (5.1.7 for database)

Frontend:
- React (18.3.1)
- Tailwind CSS (3.4.10 for styling)
- DaisyUI (4.12.10 for UI components)





## Setup and Installation

### Backend:

1. Navigate to the `Backend` directory:

    ```bash
    cd Backend
    ```

2. Install the backend dependencies:

    ```bash
    npm install
    ```

3. Run the database migrations and start the backend server:

    ```bash
    npm run setup
    ```

4. The backend server will be running on `http://localhost:3001`.

### Frontend:

1. Navigate to the `Frontend` directory:

    ```bash
    cd Frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

4. The frontend application will be available at `http://localhost:3000`.



## Script `setup.sh`

The `setup.sh` script is used to automate the setup process for both the backend and frontend of the Notes application. This script performs the following tasks:

1. **Backend Setup**
   - Navigates to the `Backend` directory.
   - Installs all necessary backend dependencies using `npm`.
   - Runs database migrations or schema setup using Sequelize CLI (`npx sequelize-cli db:migrate`).

2. **Frontend Setup**
   - Navigates to the `Frontend` directory.
   - Installs all necessary frontend dependencies using `npm`.

3. **Completion Message**
   - Provides a message indicating that the setup is complete and that you can now run the backend and frontend servers separately.

### Usage

To use this script, follow these steps:

1. Ensure that you have the necessary tools installed, including Node.js and npm.

2. Make the script executable:

    ```bash
    chmod +x setup.sh
    ```

3. Run the script:

    ```bash
    ./setup.sh
    ```

This script will streamline the process of preparing both the backend and frontend environments for development or deployment.