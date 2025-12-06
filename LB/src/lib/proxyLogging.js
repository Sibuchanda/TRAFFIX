
import proxyRequest from "./proxyRequest.js";
import { logRequest } from "./logger.js";

const handleProxyLogging = (req, res, backend, requestId, clientIp) => {
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
    },requestId);
    
};

export default handleProxyLogging;