let express = require('express')
let app = express();

let http = require('http');


app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('dist'));


let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.broadcast.emit('update');
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
