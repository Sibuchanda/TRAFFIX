## healthChecker

`healthChecker` is a function that periodically monitors the health status of all configured backend servers. It performs HTTP/HTTPS health checks at regular intervals, updates the backend pool based on response status, and logs the health status of each backend.

- **Parameters**
  - None

- **Returns**
  - `void` : Starts an interval timer that continuously monitors backend health. Does not return a value.