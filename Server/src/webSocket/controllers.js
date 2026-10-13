import WebSocket from "ws";
import { v4 as uuid4 } from "uuid";
import { rooms, clients } from "./memory.js";

export const addClient = (socket, request) => {
    const url = new URL(
        request.url,
        "http://localhost:8080"
    );

    const username = url.searchParams.get("username");
    const clientId = uuid4();

    socket.id = clientId;
    socket.username = username;
    socket.roomId = null;

    clients.set(clientId, socket);

    console.log("New Client Connected");
    console.log(`Client username : ${socket.username}`);
    console.log(`Client ID : ${socket.id}`);
};

export const roomCleanup = (roomId) => {
    if (rooms.has(roomId)) {
        const roomMembers = rooms.get(roomId);
        if (!roomMembers || roomMembers.size === 0) {
            rooms.delete(roomId);
        }
    }
};

export const addToRoom = (roomId, socket) => {
    rooms.get(roomId).add(socket);
    socket.roomId = roomId;
};

export const createRoom = (socket) => {
    const roomId = uuid4();
    const roomMembers = new Set();
    rooms.set(roomId, roomMembers);

    addToRoom(roomId, socket);

    return (roomId);
};

export const broadcastToRoomMembers = (socket, roomId, roomMessage) => {
    const roomMembers = rooms.get(roomId);
    if (!roomMembers) return;

    for (let client of roomMembers) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(roomMessage);
        }
    }
};

export const removeClientFromRoom = (socket) => {
    const { roomId } = socket;
    if (!roomId) return;
    socket.roomId = null;

    const roomMembers = rooms.get(roomId);
    if (!roomMembers) return;
    roomMembers.delete(socket);

    if (roomMembers.size === 0) {
        roomCleanup(roomId);
        return;
    }

    const roomMessage = JSON.stringify({
        type: "user-left",
        data: {
            message: `${socket.username} left the chat`,
            time: new Date().toLocaleString()
        }
    });
    broadcastToRoomMembers(socket, roomId, roomMessage);
};

