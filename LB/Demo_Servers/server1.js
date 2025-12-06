import http from "http";

http.createServer((req, res) => {
   if(req.url==='/health'){
      res.statusCode=200;
      return res.end("OK");
   }
   res.end(`Response from Backend 1`);
}).listen(3001, () => console.log("Backend 1 running on 3001"));
