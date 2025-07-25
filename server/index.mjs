import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

io.on('connection', (socket) => {
  console.log("user connected")
  console.log(socket.id)
  setTimeout(() => {
    socket.emit('apple', 'hello from server')
  }, 2000)
  socket.on("apple", (data) => {
    console.log(data)
  })
})

app.get('/', (req, res, next) => {
  res.send("send")
})

httpServer.listen(5000, (e) => {
  if (e) {
    return console.log(e)
  }
  console.log("server started on 5000")
});