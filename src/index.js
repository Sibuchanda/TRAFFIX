import http from "http";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
import backendPool from "./lib/backendPool.js";
import proxyRequest from "./lib/proxyRequest.js";
import startHealthChecker from "./lib/healthChecker.js";
import { logRequest, logError } from "./lib/logger.js";

const PORT = process.env.LB_PORT || 8080;

// Check health status of backend servers
startHealthChecker();

const server = http.createServer((req, res) => {
  // =======  Ignores browser generated favicon request=====
  if (req.url === "/favicon.ico") {
    res.statusCode = 204;
    logRequest({
    type: "IGNORE",
    path: "/favicon.ico"
  });
    res.end();
  }

  const requestId = crypto.randomUUID();
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const backend = backendPool.getNextHealthyBackend();

  if (!backend) {
    res.statusCode = 503;

    logError({
      requestId,
      error: "No healthy backend available",
      clientIp,
      method: req.method,
      path: req.url,
    });
    return res.end("Service Unavailable: No healthy backend");
  }

  const startTime = Date.now();
  proxyRequest(req, res, backend.url, (statusCode) => {
    const latency = Date.now() - startTime;
    logRequest({
      requestId,
      method: req.method,
      path: req.url,
      backend: backend.url,
      latency_ms: latency,
      status: statusCode,
      clientIp,
    });
  }, requestId);
});

server.listen(PORT, () => {
  console.log(`Load Balancer listening on port: ${PORT}`);
});
