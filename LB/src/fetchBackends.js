import dotenv from 'dotenv';
dotenv.config();
import axios from "axios";
import { updateBackendList } from "./lib/backendPool.js";

export const startBackendUpdater = () => {
  const ADMIN_SERVER_URL = process.env.ADMIN_SERVER_URL;

  const fetchBackends = async () => {
    try {
      const res = await axios.get(`${ADMIN_SERVER_URL}/api/backends/all`);
      console.log(res.data.backends);
      updateBackendList(res.data.backends);
    } catch (err) {
      console.error("Failed to fetch backend servers:", err.message);
    }
  };

fetchBackends();
setInterval(fetchBackends, 5 * 60 * 1000);
};
