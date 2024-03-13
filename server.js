const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(cors());

let connectedClients = 0;

app.use(express.static(__dirname + '/public'));

const ioOptions = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
};
const io = new socketIo.Server(server, ioOptions);

io.on('connection', socket => {
    console.log('A user connected');
    connectedClients++;

    io.emit('client count', connectedClients);

    socket.on('disconnect', () => {
        console.log('User disconnected');
        connectedClients--;
        io.emit('client count', connectedClients);
    });

    socket.on('chat message', msg => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
