
let currentIndex = 0;
let backendList=[];

export const updateBackendList = (dbBackends)=>{
   backendList=dbBackends.map(server=>({
    url: server.url,
    healthy: server.status,
   }))
}


const backendPool = {
  // Return all backends
  getAll() {
    return backendList;
  },

  // Mark backend url as healthy
  markHealthy(url) {
    backendList = backendList.map(b =>
      b.url === url ? { ...b, healthy: true } : b
    );
  },
 // Mark backend url as unhealthy
  markUnhealthy(url) {
    backendList = backendList.map(b =>
      b.url === url ? { ...b, healthy: false } : b
    );
  },
  // Get next server
  getNextHealthyBackend() {
    const total = backendList.length;
    if(total===0) return null;

    for (let ind = 0; ind < total; ind++) {
      const backend = backendList[currentIndex];
      currentIndex = (currentIndex + 1) % total;
      if (backend.healthy) {
        return backend;
      }
    }
    return null;
  }
};

export default backendPool;
