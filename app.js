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
const __dirname = path.resolve()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
  })
);
app.options('*', cors());
const peerServer = ExpressPeerServer(server, { debug: true });
app.use("/api", routes);
app.use("/peerjs", peerServer);

// Serve assets with correct MIME types
app.use(
  "/assets",
  express.static(path.join(__dirname, "front", "dist", "assets"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// Serve other static files
app.use(
  express.static(path.join(__dirname, "front", "dist"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "front", "dist", "index.html"));
});

setupSocket(server);

server.listen(config.port, () => {
  console.log("server is running...");
});