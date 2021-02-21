const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 4001;

app.use(cors());

app.get("/", (req, res) => {
  res.send({ response: "Putangina mo shaine" }).status(200);
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 500);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date().toLocaleTimeString();

  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
