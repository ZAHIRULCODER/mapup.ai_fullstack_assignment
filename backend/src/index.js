import express from "express";
import authRoutes from "./routes/authRoutes.js";
import csvRoutes from "./routes/csvRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import { setupSocket } from "./socket.js";


dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.FRONTEND_URL,
	},
});

export { io };

setupSocket(io);

// database connection
connectDB();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));

// routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", csvRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
