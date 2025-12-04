import http from 'http';
import dotenv from 'dotenv'
dotenv.config();
import backendPool from './lib/backendPool.js';

const PORT = process.env.LB_PORT || 8080;


const server = http.createServer((req, res) => {

  res.statusCode = 200;  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Load Balancer is running\n');
});

server.listen(PORT, () => {
  console.log(`Load Balancer listening on port: ${PORT}`);
  console.log(backendPool.getAll());
});
