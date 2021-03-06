import { createServer, Server as ServerHTTP } from "http";
import express, { Express, Request, Response } from "express";
import Server from "next-server/dist/server/next-server";
import socket, { Socket, Server as SocketServ } from "socket.io";
import { Dialogue } from "../components/types";
import next from "next";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const app: Express = express();
const nextApp: Server = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    app.get("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    app.get("/", (req: Request, res: Response) => {
      nextApp.render(req, res, "/", req.query());
    });

    const server: ServerHTTP = createServer(app);
    const io: SocketServ = socket(server);

    let room: number = 0;
    io.on("connection", (socket: Socket) => {
      socket.join(`room-${room}`);
      socket.emit("s", room);
      if (
        io.nsps["/"].adapter.rooms[`room-${room}`] &&
        io.nsps["/"].adapter.rooms[`room-${room}`].length === 2
      ) {
        io.of("/")
          .to(`room-${room}`)
          .emit("ChangeRoom");
        room++;
      }
      if (
        io.nsps["/"].adapter.rooms[`room-${room}`] &&
        io.nsps["/"].adapter.rooms[`room-${room}`].length >= 3
      ) {
      }

      socket.in(`room-${room}`).on("msg", (message: Dialogue) => {
        socket.in(`room-${room}`).broadcast.send(message);
      });
    });

    server.listen(port, () =>
      console.log(
        `> Server listening at http://localhost:${port} as ${
          dev ? "development" : process.env.NODE_ENV
        }`
      )
    );
  })
  .catch((ex: any) => {
    console.error(ex.stack);
    process.exit(1);
  });
