# Backup Node Application

This application is a simple web interface for creating and downloading PostgreSQL database backups. It uses Express.js for the server, basic authentication for security, and environment variables for configuration.

## Features

- Basic authentication to secure access.
- Create PostgreSQL database backups.
- Download existing backup files.
- **Delete backup files.**
- Simple and clean user interface.

## Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL installed and accessible from your server.
- PostgreSQL client (e.g., `psql`) installed on your machine.
- A `.env` file with the necessary configuration.

## PostgreSQL Client Installation

To install the PostgreSQL client on your machine, follow these steps:

### On macOS

1. **Using Homebrew:**

   ```bash
   brew install postgresql
   ```

2. **Verify the installation:**

   ```bash
   psql --version
   ```

### On Ubuntu

1. **Update the package list:**

   ```bash
   sudo apt update
   ```

2. **Install the PostgreSQL client:**

   ```bash
   sudo apt install postgresql-client
   ```

3. **Verify the installation:**

   ```bash
   psql --version
   ```

### On Windows

1. **Download the installer from the official PostgreSQL website:**
   [PostgreSQL Downloads](https://www.postgresql.org/download/)

2. **Run the installer and select the components you need, including the command line tools.**

3. **Verify the installation by opening a command prompt and typing:**

   ```bash
   psql --version
   ```

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory with the following content:**

   ```plaintext
   POSTGRES_DATABASE_URL=postgres://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>
   AUTH_USER=admin
   AUTH_PASSWORD=password123
   PORT=3000
   ```

   Replace `<db_user>`, `<db_password>`, `<db_host>`, `<db_port>`, and `<db_name>` with your actual PostgreSQL database credentials and connection details.

4. **Ensure the `backups` directory exists:**

   Create a directory named `backups` in the root of your project if it doesn't already exist. This is where the backup files will be stored.

   ```bash
   mkdir backups
   ```

## Usage

1. **Start the application:**

   ```bash
   npm start
   ```

2. **Access the application:**

   Open your web browser and go to `http://localhost:3000`. You will be prompted to enter the username and password specified in your `.env` file.

3. **Create a backup:**

   Click the "Create Backup" button to generate a new PostgreSQL backup. The backup will be listed below the button once it's created.

4. **Download a backup:**

   Click on any backup file listed to download it to your local machine.

5. **Delete a backup:**

   To delete a backup, simply click the "Delete" button next to the backup file you wish to remove in the web interface. This will send a request to the server to delete the file from the backups directory.

   Ensure the server is running and you have the necessary permissions to delete files from the server's file system.

## Security

- Ensure your `.env` file is added to `.gitignore` to prevent it from being committed to version control.
- Use strong passwords for your database and basic authentication.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
