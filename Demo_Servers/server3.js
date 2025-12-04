import http from "http";

http.createServer((req, res) => {
  res.end("Response from Backend 3");
}).listen(3003, () => console.log("Backend 1 running on 3003"));
