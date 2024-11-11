import cors from "cors";
import express from "express";
import appointmentsRouter from "./routes/appointmentsRouter";
import usersRouter from "./routes/usersRouter";

const server = express();

server.use(express.json());
server.use(cors());
server.use(appointmentsRouter);
server.use(usersRouter);

export default server;
