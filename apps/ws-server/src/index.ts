import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";

const wss = new WebSocketServer({ port: 3002 });

console.log("WebSocket server is running on ws://localhost:3002");

wss.on("connection", async (socket) => {
  console.log("Client connected");

  try {
    socket.on("message", async (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log("Received message:", data);
        
        // Handle different message types here
        socket.send(JSON.stringify({ status: "ok", message: "Message received" }));
      } catch (error) {
        console.error("Error processing message:", error);
        socket.send(JSON.stringify({ status: "error", message: "Invalid message format" }));
      }
    });

    socket.on("close", () => {
      console.log("Client disconnected");
    });

    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    // Send initial connection success message
    socket.send(JSON.stringify({ status: "ok", message: "Connected to WebSocket server" }));
  } catch (error) {
    console.error("Error in connection handler:", error);
    socket.close();
  }
});