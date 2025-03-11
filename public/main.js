document.addEventListener("DOMContentLoaded", function () {
  fetchAndDisplayBackups(); // Fetch and display backups on page load
});

document.getElementById("action-button").addEventListener("click", function () {
  const loadingElement = document.getElementById("loading");
  loadingElement.style.display = "block"; // Show loading indicator

  fetch("/api/backup", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      fetchAndDisplayBackups(); // Refresh the file list to include the new backup
    })
    .catch((error) => {
      console.error("Error creating backup:", error);
    })
    .finally(() => {
      loadingElement.style.display = "none"; // Hide loading indicator
    });
});

function fetchAndDisplayBackups() {
  fetch("/api/backups")
    .then((response) => response.json())
    .then((files) => {
      const fileListElement = document.getElementById("file-list");
      fileListElement.innerHTML = ""; // Clear existing list
      files.forEach((file) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = file;
        link.href = `/download/${file}`;
        link.download = file;
        li.appendChild(link);
        fileListElement.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error fetching backup files:", error);
    });
}
