import http from "http";
import https from "https";
import { URL } from "url";
import BACKENDS from "../config/backend.js";
import HEALTHCHECK_CONFIG from "../config/healthCheck.js";
import backendPool from "./backendPool.js";


function startHealthChecker() {

  setInterval(() => {
    BACKENDS.forEach((backend, index) => {
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
        res => {
          if (res.statusCode >= 200 && res.statusCode < 400) {
            backendPool.markHealthy(index);
            console.log(`Healthy: ${backend.url}`);
          } else {
            backendPool.markUnhealthy(index);
            console.log(`Unhealthy (status ${res.statusCode}): ${backend.url}`);
          }
        }
      );
      // IF the request takes too long
      req.on("timeout", () => {
        console.log(`Timeout: ${backend.url}`);
        backendPool.markUnhealthy(index);
        req.destroy();
      });
      // If any network error occurs
      req.on("error", () => {
        console.log(`Error: ${backend.url}`);
        backendPool.markUnhealthy(index);
      });
      req.end();
    });
  }, HEALTHCHECK_CONFIG.interval);
}

export default startHealthChecker;
