import http from "http";
import dotenv from "dotenv";
dotenv.config();

import startHealthChecker from "./lib/healthChecker.js";
import handleProxyLogging from "./lib/proxyLogging.js";
import handleRequest from "./lib/requestHandler.js";
import { startBackendUpdater } from "./fetchBackends.js";
import { logRequest } from "./lib/logger.js";

const PORT = process.env.LB_PORT || 8080;

// Load backends from admin DB (every 5 mins)
startBackendUpdater();

// Check health status of backend servers
startHealthChecker();

const server = http.createServer((req, res) => {
  // Ignores browser generated favicon request
  if (req.url === "/favicon.ico") {
    res.statusCode = 204; //No Content
    logRequest({
    type: "IGNORE",
    path: "/favicon.ico"
  });
  return res.end();
  }

  // Choosing healthy backend for incoming request
  const targetBackend = handleRequest(req,res);
  if(!targetBackend) return;

  const {requestId, clientIp, backend } = targetBackend;
  // Handling reverse-proxy and logging
  handleProxyLogging(req, res, backend, requestId, clientIp);
});



server.listen(PORT, () => {
  console.log(`Load Balancer listening on port: ${PORT}`);
});
