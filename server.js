const http = require("http")
const fs = require("fs")
const path = require("path")

const port = 3000 // Choose any port you like

// Create a server
const server = http.createServer((req, res) => {
  // Handling different routes
  if (req.url === "/" || req.url === "/index.html") {
    // Read and serve index.html
    fs.readFile(path.join(__dirname, "dist", "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" })
        res.end("Internal Server Error")
      } else {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(data)
      }
    })
  } else if (req.url === "/bundle.js") {
    // Read and serve bundle.js
    fs.readFile(path.join(__dirname, "dist", "bundle.js"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" })
        res.end("Internal Server Error")
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" })
        res.end(data)
      }
    })
  } else if (req.url === "/app.css") {
    // Read and serve app.css
    fs.readFile(path.join(__dirname, "dist", "app.css"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" })
        res.end("Internal Server Error")
      } else {
        res.writeHead(200, { "Content-Type": "text/css" })
        res.end(data)
      }
    })
  } else if (req.url === "/server.js") {
    // Read and serve your server-side script if needed
    fs.readFile(path.join(__dirname, "dist", "server.js"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" })
        res.end("Internal Server Error")
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" })
        res.end(data)
      }
    })
  } else {
    // Handle 404 - Not Found
    res.writeHead(404, { "Content-Type": "text/plain" })
    res.end("404 - Not Found")
  }
})

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
