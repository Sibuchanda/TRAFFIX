import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./src/app";

const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Admin Backend listening to PORT : ${PORT}`);
});



