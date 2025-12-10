import mongoose from "mongoose";

const backendSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Unnamed Server"
    },
    url: {
      type: String,
      required: true,
      unique: true
    },
    status : {
      type: Boolean,
      required: true,
      default: false
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("BackendServer", backendSchema);
