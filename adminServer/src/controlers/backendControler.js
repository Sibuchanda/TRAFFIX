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
      message: "Server error while adding backends into database"
    });
  }
};

// ========== Get all backend servers =========
export const getBackends = async (req, res) => {
  try {
    const backends = await BackendServer.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      backends
    });

  } catch (err) {
    console.error("Get Backends Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching all backends"
    });
  }
};

// ========== Update a backend server =========
export const updateBackend = async (req, res) => {
  try {
    const { name, url } = req.body;
    if(!name || !url){
      return res.status(400).json({success: false, message: "Name and URL fields are required"})
    }
    const backend = await BackendServer.findById(req.params.id);
    if (!backend) {
      return res.status(404).json({
        success: false,
        message: "Backend server not found"
      });
    }

    backend.name = name || backend.name;
    backend.url = url || backend.url;

    await backend.save();

    return res.json({
      success: true,
      message: "Backend updated successfully",
      backend
    });

  } catch (err) {
    console.error("Update Backend Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while updating backend servers"
    });
  }
};

// ========== Delete a backend server =========
export const deleteBackend = async (req, res) => {
  try {
    const backend = await BackendServer.findById(req.params.id);
    if (!backend) {
      return res.status(404).json({
        success: false,
        message: "Backend server not found"
      });
    }

    await BackendServer.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: "Backend removed successfully"
    });

  } catch (err) {
    console.error("Delete Backend Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting servers from the database"
    });
  }
};

