require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const basicAuth = require("express-basic-auth");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { URL } = require("url");

const app = express();
const port = process.env.PORT || 3000;

// Basic authentication setup
app.use(
  basicAuth({
    users: { [process.env.AUTH_USER]: process.env.AUTH_PASSWORD },
    challenge: true, // Enables the browser to show a login prompt
    unauthorizedResponse: (req) => "Unauthorized",
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint to get the list of backup files
app.get("/api/backups", (req, res) => {
  const backupDir = path.join(__dirname, "backups");
  fs.readdir(backupDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to scan directory" });
    }
    res.json(files);
  });
});

// Endpoint to trigger PostgreSQL backup
app.post("/api/backup", (req, res) => {
  const backupFileName = `backup_${new Date().toISOString()}.sql`;
  const backupFilePath = path.join(__dirname, "backups", backupFileName);

  // Parse the connection string
  const dbUrl = new URL(process.env.POSTGRES_DATABASE_URL);
  const dbUser = dbUrl.username;
  const dbPassword = dbUrl.password;
  const dbName = dbUrl.pathname.split("/")[1];
  const dbHost = dbUrl.hostname;
  const dbPort = dbUrl.port;

  // Command to create a PostgreSQL backup using parsed connection string
  const command = `PGPASSWORD=${dbPassword} pg_dump -U ${dbUser} -h ${dbHost} -p ${dbPort} ${dbName} > ${backupFilePath}`;

  exec(command, (error, stdout, stderr) => {
    console.log(command);
    if (error) {
      console.error(`Error executing backup: ${stderr}`);
      return res.status(500).json({ error: "Backup failed" });
    }
    console.log(`Backup created: ${backupFileName}`);
    res.json({ message: "Backup successful", file: backupFileName });
  });
});

app.get("/backup", (req, res) => {
  const backup = req.query.backup;
  const backupPath = path.join(__dirname, "backups", backup);
  res.sendFile(backupPath);
});

// Endpoint to download a specific backup file
app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "backups", filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error(`Error downloading file: ${err}`);
      res.status(500).send("Error downloading file");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
