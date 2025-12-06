import BackendServer from "../models/BackendServer.js";


// ======== Add backend =========
export const addBackend = async (req, res) => {
  try {
    const { name, url } = req.body;
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Backend URL is required"
      });
    }

    const existing = await BackendServer.findOne({ url });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This backend URL already exists"
      });
    }
    const newBackend = await BackendServer.create({ name, url });
    return res.status(201).json({
      success: true,
      message: "Backend server added successfully",
      backend: newBackend
    });
  } catch (err) {
    console.error("Add Backend Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
