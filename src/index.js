import http from 'http';
import dotenv from 'dotenv'
dotenv.config();
import backendPool from './lib/backendPool.js';
import proxyRequest from './lib/proxyRequest.js';
import startHealthChecker from './lib/healthChecker.js';
import { logRequest } from './lib/logger.js';

const PORT = process.env.LB_PORT || 8080;

// Check health status of backend servers
startHealthChecker();

const server = http.createServer((req, res) => {
  // Ignores browser generated favicon request
  if(req.url=== "/favicon.ico"){
    res.statusCode=204;
    res.end();
  }
  const backend = backendPool.getNextHealthyBackend();
  
  if (!backend) {
    res.statusCode=503;
    return res.end("Service Unavailable: No healthy backend");
  }
  const startTime = Date.now();
  
  proxyRequest(req, res, backend.url,()=>{
     const latency=Date.now() - startTime;
     logRequest(backend.url, req, latency);
  });
});

server.listen(PORT, () => {
  console.log(`Load Balancer listening on port: ${PORT}`);
});
