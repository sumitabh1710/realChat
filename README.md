Instructions
Running the Server
Clone this repository to your local machine.

Install dependencies using npm:
npm install

Start the server:
node server.js
The server will start running on http://localhost:3000.

Running the Client
Open the index.html file in a web browser.


Architecture and Concurrency Handling
The server is implemented using Node.js with the Express.js framework for handling HTTP requests and Socket.IO for real-time communication with clients.

Server Architecture: The server handles multiple client connections concurrently using asynchronous I/O. Each client connection is managed by a separate instance of a Socket.IO socket. When a client sends a message, the server broadcasts it to all other connected clients.

Client Architecture: The client-side code is implemented using HTML, CSS, and JavaScript. It establishes a WebSocket connection with the server using the Socket.IO client library. Users can send and receive messages in real-time via the chat interface.

Assumptions and Design Choices
CORS: CORS (Cross-Origin Resource Sharing) is enabled on the server to allow communication between the client and server applications running on different origins.

Broadcasting Messages: Messages sent by clients are broadcasted to all connected clients, excluding the sender. This design choice enables real-time communication in a shared chatroom environment.

Accessing the Chat Application
Once the server is running, you can access the chat application by opening the index.html file in a web browser. You can then start chatting with other users who are connected to the same server.
