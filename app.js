import express from 'express'
import http from 'http'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import config from './config.js'
import routes from './backEnd/server.js'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import { setupSocket } from './backEnd/socket.js'
import { ExpressPeerServer } from 'peer'
import './backEnd/config/database.js'

dotenv.config();

const app = express();
const server = http.createServer(app);
const __dirname = path.dirname("")
console.log(__dirname)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
const peerServer = ExpressPeerServer(server, { debug: true });
app.use('/api', routes);
app.use("/peerjs", peerServer);
const buildPath = path.join(__dirname, "./front/dist");
console.log(buildPath)
app.use(express.static(buildPath));

setupSocket(server);

server.listen(config.port, () => {
  console.log("server is running...");
});