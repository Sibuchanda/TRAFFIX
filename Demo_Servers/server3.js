import http from "http";

http.createServer((req, res) => {
   if(req.url==='/health'){
      res.statusCode=200;
      return res.end("OK");
   }
  res.end("Response from Backend 3");
}).listen(3003, () => console.log("Backend 3 running on 3003"));
