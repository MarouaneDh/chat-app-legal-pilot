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
const authRouter = require("./routes/auth");

// connect DB
dbConnect();
//body parse midware
app.use(express.json());

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

//create route
app.use("/api/user", require("./routes/users"));
app.use("/api/auth", authRouter);