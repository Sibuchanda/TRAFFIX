export const metrics = {
  totalRequests: 0,
  backendURL: {},
};

export function logRequest(url, clientReq, latency) {
  metrics.totalRequests++;

  if (!metrics.backendURL[url]) {
    metrics.backendURL[url] = 0;
  }
  metrics.backendURL[url]++;

  console.log(
    `[REQ] : ${clientReq.method} ${clientReq.url} | ` +
    `Backend :  ${url} | ` +
    `Latency : ${latency}ms`
  );
}

export function logHealth(url, status) {
  console.log(`[HEALTH] : ${url} : ${status}`);
}
