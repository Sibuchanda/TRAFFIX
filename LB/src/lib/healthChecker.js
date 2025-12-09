import http from "http";
import https from "https";
import { URL } from "url";
import HEALTHCHECK_CONFIG from "../config/healthCheck.js";
import backendPool from "./backendPool.js";
import { logHealth } from "./logger.js";


function startHealthChecker() {

  setInterval(() => {
   const backends = backendPool.getAll();
    backends.forEach((backend, index) => {
      const healthUrl = new URL(backend.url + HEALTHCHECK_CONFIG.path);
      const protocol = healthUrl.protocol === "https:" ? https : http;

      const req = protocol.request(
        {
          hostname: healthUrl.hostname,
          port: healthUrl.port,
          path: healthUrl.pathname,
          method: "GET",
          timeout: HEALTHCHECK_CONFIG.timeout
        },
        (res) => {
          if (res.statusCode >= 200 && res.statusCode < 400) {
            backendPool.markHealthy(backend.url);
            logHealth({
              backend: backend.url,
              status: "healthy",
              statusCode: res.statusCode
            });
          } else {
            backendPool.markUnhealthy(backend.url);
            logHealth({
              backend: backend.url,
              status: "unhealthy",
              statusCode: res.statusCode
            });
          }
        }
      );
      // IF the request takes too long
      req.on("timeout", () => {
        backendPool.markUnhealthy(backend.url);
        logHealth({
          backend: backend.url,
          status: "timeout"
        });
        req.destroy();
      });
      // If any network error occurs
      req.on("error", () => {
        backendPool.markUnhealthy(backend.url);
        logHealth({
          backend: backend.url,
          status: "error"
        });
      });
      req.end();
    });
  }, HEALTHCHECK_CONFIG.interval);
}

export default startHealthChecker;
