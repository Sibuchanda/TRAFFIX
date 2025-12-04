import http from "http";

http.createServer((req, res) => {
  res.end("Response from Backend 2");
}).listen(3002, () => console.log("Backend 1 running on 3002"));
