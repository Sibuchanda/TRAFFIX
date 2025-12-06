## proxyRequest

`proxyRequest` is a function that forwards incoming HTTP/HTTPS requests from a client to a target backend server and streams the response back to the client, acting as a reverse proxy.

- **Parameters**
  - `clientReq` : `http.IncomingMessage` – The incoming request from the client.
  - `clientRes` : `http.ServerResponse` – The response object to send data back to the client.
  - `targetUrl` : `string` – The base URL of the target backend server.

- **Returns**
  - `void` : Does not return a value. Handles the request/response lifecycle asynchronously.