import {WebSocketServer} from "ws";
import {client} from "@repo/db/client"
const server = new WebSocketServer({ port: 3002 });

server.on("connection", async (ws) => {
  const user = await client.user.create({
    data: {
      username: Math.random().toString(36).substring(2, 15),
      password: Math.random().toString(36).substring(2, 15),
    },
  });
  
  console.log(user);

  ws.send("Welcome! WebSocket server connected");
});