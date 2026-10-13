import "dotenv/config";
import express from "express";
import http from "node:http";
import cors from "cors";

import SocketServer from "./webSocket/socketServer.js";
import connectDB from "./config/db/mongo.js";

const PORT = process.env.PORT || 8080;
const app = express();

const server = http.createServer(app);

const wss = SocketServer(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return (res.send("Welcome to Chat Application"));
});

const startServer = async () => {
    await connectDB();
    server.listen(PORT, () => {
        console.log(`Server listening on port : ${PORT}`);
    });
};
startServer();

