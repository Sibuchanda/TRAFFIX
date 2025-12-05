import http from "http";
import https from "https";
import { URL } from "url";

function proxyRequest(clientReq, clientRes, targetUrl, logCallback) {
  const parsed = new URL(targetUrl + clientReq.url);

  const options = {
    hostname: parsed.hostname,
    port: parsed.port,
    path: parsed.pathname + parsed.search,
    method: clientReq.method,
    headers: clientReq.headers
  };

  const protocol = parsed.protocol === "https:" ? https : http;

  const backendReq = protocol.request(options, res => {
    clientRes.writeHead(res.statusCode, res.headers);
    res.pipe(clientRes); // Stream Backend response to Client

    res.on("close", ()=>{
      if(logCallback) logCallback();
    })
  });

  // Stream(forward) Client request body to Backend
  clientReq.pipe(backendReq);

  backendReq.on("error", err => {
    console.error("Proxy error:", err.message);
    clientRes.statusCode = 502;
    clientRes.end("Bad Gateway: Failed to reach backend");
  });

}

export default proxyRequest;
