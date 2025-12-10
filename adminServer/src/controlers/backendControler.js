import { success } from "zod";
import BackendServer from "../models/BackendServer.js";
import User from "../models/User.js";


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

    const existing = await BackendServer.findOne({ url, admin: req.user.id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This backend URL already exists"
      });
    }
    const newBackend = await BackendServer.create({ name, url, admin: req.user.id });
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
    const backends = await BackendServer.find({admin: req.user.id}).sort({ createdAt: -1 });
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
    const backend = await BackendServer.findOne({_id: req.params.id, admin: req.user.id});
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
    const backend = await BackendServer.findOneAndDelete({_id: req.params.id,
      admin: req.user.id});
    
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

// ========== Fetching Admin User details =========
export const getAdmin = async (req,res) =>{
  try{
    const adminId = req.user.id;
    const admin = await User.findById(adminId).select("-password -saltvalue");
    if(!admin){
      return res.status(404).json({
        success:false,
        message: "Admin not found!"
      })
    }
    return res.status(200).json({
      success: true,
      admin: {
        name: admin.name,
        email: admin.email,
        role: "Admin"
      }
    })
  }catch(err){
     return res.status(404).json({
      success: false,
      message: err.message || "Admin details not found!"
     })
  }
}
