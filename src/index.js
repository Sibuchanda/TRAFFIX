import http from 'http';
import dotenv from 'dotenv'
dotenv.config();
import backendPool from './lib/backendPool.js';
import proxyRequest from './lib/proxyRequest.js';

const PORT = process.env.LB_PORT || 8080;


const server = http.createServer((req, res) => {
  const backend = backendPool.getNextHealthyBackend();
  
  if (!backend) {
    return res.statusCode(503).end("Service Unavailable: No healthy backend");
  }

  console.log(`Request forwarded to : ${backend.url}`);
  proxyRequest(req, res, backend.url);
});

server.listen(PORT, () => {
  console.log(`Load Balancer listening on port: ${PORT}`);
});
