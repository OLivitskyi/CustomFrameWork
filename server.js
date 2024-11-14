const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

// Function to serve static files
const serveFile = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
};

// Create a server
const server = http.createServer((req, res) => {
  const routes = {
    "/": "index.html",
    "/index.html": "index.html",
    "/bundle.js": "bundle.js",
    "/app.css": "app.css",
  };

  const contentTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
  };

  const filePath = routes[req.url]
      ? path.join(__dirname, "dist", routes[req.url])
      : path.join(__dirname, "dist", req.url);

  const ext = path.extname(filePath);
  const contentType = contentTypes[ext] || "text/plain";

  // Serve the requested file or return 404
  fs.exists(filePath, (exists) => {
    if (exists) {
      serveFile(res, filePath, contentType);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - Not Found");
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
