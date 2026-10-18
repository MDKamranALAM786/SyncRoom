import "dotenv/config";
import express from "express";
import http from "node:http";
import cors from "cors";
import cookieParser from "cookie-parser";

import SocketServer from "./webSocket/socketServer.js";
import connectDB from "./config/db/mongo.js";
import router from "./routes/router.js";

const PORT = process.env.PORT || 8080;
const app = express();

const server = http.createServer(app);

const wss = SocketServer(server);

const allowedOrigins = [
    process.env.ALLOWED_ORIGIN,
    "http://localhost:5173"
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS : Origin Not Allowed"));
        }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    return (res.send("Welcome to Chat Application"));
});

app.use("/", router);

const startServer = async () => {
    await connectDB();
    server.listen(PORT, () => {
        console.log(`Server listening on port : ${PORT}`);
    });
};
startServer();

