import http from "http";

http.createServer((req, res) => {
   res.end(`Response from Backend 1`);
}).listen(3001, () => console.log("Backend 1 running on 3001"));
