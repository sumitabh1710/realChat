const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

let connectedClients = 0;

// Serve static files (e.g., HTML, CSS, client-side JavaScript)
app.use(express.static(__dirname + "/public"));

const ioOptions = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};
const io = new socketIo.Server(server, ioOptions);

// Socket.IO event handling
io.on("connection", (socket) => {
  console.log("A user connected");
  connectedClients++;

  // Handle client count
  io.emit("client count", connectedClients);

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
    connectedClients--;
    io.emit("client count", connectedClients);
  });

  // Handle incoming chat messages
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg); // Broadcast message to all clients
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
