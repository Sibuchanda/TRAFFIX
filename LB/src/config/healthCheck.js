const HEALTHCHECK_CONFIG = {
  path: "/health", // Endpoint to check
  interval: 5000, // Run every 5 seconds
  timeout: 10000 // Request timeout (ms)
};

export default HEALTHCHECK_CONFIG;
