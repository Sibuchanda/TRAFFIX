import axios from "axios";
import BackendServer from "../models/BackendServer.js";
import HEALTHCHECK_CONFIG from "../config/healthCheck.js";


const checkBackendStatus = async (req, res) => {
  try {
    const backends = await BackendServer.find();
    for (const backend of backends) {
      const healthUrl = backend.url + HEALTHCHECK_CONFIG.path;

      let newStatus = false;
      try {
        const response = await axios.get(healthUrl, {
          timeout: HEALTHCHECK_CONFIG.timeout,
        });
        if (response.status === 200) {
          newStatus = true;
        }
      } catch (err) {
        newStatus = false;
      }
      if (backend.status !== newStatus) {
        backend.status = newStatus;
        await backend.save();
      }
    }

   const updatedList = await BackendServer.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Backend statuses updated",
      backends: updatedList,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default checkBackendStatus;
