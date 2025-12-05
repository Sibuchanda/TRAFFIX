import http from "http";
import https from "https";
import { URL } from "url";
import { logError } from "./logger.js";

function proxyRequest(clientReq, clientRes, targetUrl, logCallback, requestId) {
  const parsed = new URL(targetUrl + clientReq.url);

  const options = {
    hostname: parsed.hostname,
    port: parsed.port,
    path: parsed.pathname + parsed.search,
    method: clientReq.method,
    headers: clientReq.headers
  };

  const protocol = parsed.protocol === "https:" ? https : http;

  const backendReq = protocol.request(options, (res) => {
    res.pipe(clientRes); // Stream Backend response to Client
    res.on("end", ()=>{
      if(logCallback) logCallback(res.statusCode);
    })
  });

  // Stream(forward) Client request body to Backend
  clientReq.pipe(backendReq);

  backendReq.on("error", (err) => {
    logError({
      type: "PROXY_ERROR",
      requestId,
      backend: targetUrl,
      error: err.message
    });
    clientRes.statusCode = 502;
    clientRes.end("Bad Gateway: Failed to reach backend");
  });

}

export default proxyRequest;
