const readline = require('readline');
const io = require('socket.io-client');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const socket = io.connect('http://localhost:3000'); // Change the URL to your server's IP address and port

socket.on('connect', () => {
    console.log('Connected to server');

    rl.question('Enter your username: ', username => {
        rl.setPrompt(`${username}: `);
        rl.prompt();

        rl.on('line', input => {
            socket.emit('chat message', `${username}: ${input}`);
            rl.prompt();
        });
    });
});

socket.on('chat message', msg => {
    console.log(msg);
    rl.prompt();
});

rl.on('close', () => {
    console.log('Disconnected from server');
    process.exit(0);
});
