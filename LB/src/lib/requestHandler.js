import crypto from "crypto";
import backendPool from "./backendPool.js";
import { logError } from "./logger.js";

const handleRequest = (req, res) => {
  const requestId = crypto.randomUUID();
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const backend = backendPool.getNextHealthyBackend();
  if (!backend) {
    res.statusCode = 503; //Service Unavailable
    logError({
      requestId,
      error: "No healthy backend available",
      clientIp,
      method: req.method,
      path: req.url,
    });
    res.end("Service Unavailable: No healthy backend");
    return null;
  }

  return {requestId, clientIp, backend};
};

export default handleRequest;
