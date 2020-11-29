const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

require('./routes/compileRoutes')(app);
require('./routes/roomRoutes')(app, io);

io.on('connection', (socket) => {
  socket.on('room', (room) => {
    socket.join(room);
  });
});

const PORT = process.env.PORT || 5000;
const server = http.listen(PORT, () => {
  console.log('Running on port ', PORT);
});
