const dotenv = require('dotenv');
let express = require('express');
let app = express();
dotenv.config({ path: './.env' });
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);
const dbConnect = require("./config/connectDB");
const port = process.env.PORT || 3000;

// connect DB
dbConnect();

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (data) => {
        io.in(data.room).emit('new message', {user: data.user, message: data.message});
    });
});

server.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });