import { WebSocketServer } from "ws";
import { rooms, clients } from "./memory.js";
import { addClient, roomCleanup, addToRoom, createRoom, broadcastToRoomMembers, removeClientFromRoom } from "./controllers.js";

const SocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (socket, request) => {
        addClient(socket, request);

        socket.on("error", (err) => {
            console.log(`Socket error : ${err.message}`);
        });

        socket.on("message", (rawMessage) => {
            let message;
            try {
                message = JSON.parse(rawMessage.toString());
            } catch (err) {
                socket.send(JSON.stringify({
                    type: "error",
                    data: {
                        message: err.message
                    }
                }));

                return;
            }

            const { type, data } = message;

            if (type === "create-room") {
                const roomId = createRoom(socket);
                const response = JSON.stringify({ message: "Created Room Successfully", roomId });
                socket.send(response);
            } else if (type === "join-room") {
                const { roomId } = data;

                if (rooms.has(roomId)) {
                    addToRoom(roomId, socket);
                    const time = new Date().toLocaleString();

                    socket.send(JSON.stringify({
                        type: "room-joined",
                        data: {
                            success: true,
                            message: `Room ID : ${roomId}`,
                            time
                        }
                    }));

                    const roomMessage = JSON.stringify({
                        type: "user-joined",
                        data: {
                            message: `${socket.username} joined the chat`,
                            time
                        }
                    });
                    broadcastToRoomMembers(socket, roomId, roomMessage);
                } else {
                    socket.send(JSON.stringify({
                        type: "room-joined",
                        data: {
                            success: false,
                            message: "Room doesnt exist or Incorrect Room ID"
                        }
                    }));
                }
            } else if (type === "chat-message") {
                const { textMessage } = data;
                const { roomId } = socket;

                if (!roomId) return;

                const roomMessage = JSON.stringify({
                    type: "chat-message",
                    data: {
                        message: textMessage,
                        time: new Date().toLocaleString()
                    }
                });
                broadcastToRoomMembers(socket, roomId, roomMessage);
            } else if (type === "leave-room") {
                removeClientFromRoom(socket);
            }
        });

        socket.on("close", () => {
            console.log(`${socket.username} disconnected from the server`);
            removeClientFromRoom(socket);
            clients.delete(socket.id);
        });
    });
};

export default SocketServer;

