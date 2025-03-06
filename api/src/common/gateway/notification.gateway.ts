import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, Socket> = new Map();

  handleConnection(client: Socket): void {
    const userId = client.handshake.query.userId;
    if (userId) {
      this.clients.set(userId as string, client);
      console.log(`User connected: ${userId} - Socket ID: ${client.id}`);
    }
  }

  handleDisconnect(client: Socket): void {
    this.clients.forEach((value, key) => {
      if (value.id === client.id) {
        this.clients.delete(key);
      }
    });
    console.log(`User disconnected: ${client.id}`);
  }

  sendNotificationToUser(userId: string, message: string): void {
    const client = this.clients.get(userId);
    if (client) {
      client.emit("notification", { message });
    }
  }

  @SubscribeMessage("sendNotification")
  handleNotification(@MessageBody() data: { userId: string; message: string }) {
    this.sendNotificationToUser(data.userId, data.message);
  }
}
