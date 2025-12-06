import BACKENDS from "../config/backend.js";

let currentIndex = 0;


const backendPool = {
  // Return all backends
  getAll() {
    return BACKENDS;
  },
  // Returns Healthy server
  markHealthy(index) {
    BACKENDS[index].healthy = true;
  },
  // Returns UnHealthy server
  markUnhealthy(index) {
    BACKENDS[index].healthy = false;
  },
  // Get next server
  getNextHealthyBackend() {
    const total = BACKENDS.length; // 3

    for (let ind = 0; ind < total; ind++) {
      const backend = BACKENDS[currentIndex];
      currentIndex = (currentIndex + 1) % total;
      if (backend.healthy) {
        return backend;
      }
    }
    return null; // If no server is healthy
  }
};

export default backendPool;
