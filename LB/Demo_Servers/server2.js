import http from "http";

http.createServer((req, res) => {
   if(req.url==='/health'){
      res.statusCode=200;
      return res.end("OK");
   }
  res.end("Response from Backend 2");
}).listen(3002, () => console.log("Backend 2 running on 3002"));
