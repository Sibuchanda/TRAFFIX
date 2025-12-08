import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import BackendTable from "./components/BackendTable";
import BackendFormDialog from "./components/BackendFormDialog";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";

import { useDispatch, useSelector } from "react-redux";
import { fetchBackends, addBackend, updateBackend, deleteBackend} from "@/redux/backendSlice";

import toast from "react-hot-toast";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { backends, loading, error } = useSelector((state) => state.backends);

  // UI States
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBackend, setSelectedBackend] = useState(null);

  const [formData, setFormData] = useState({ name: "", url: "" });


  const user = {
    name: "Lester_101",
    email: "admin@gmail.com",
    role: "Admin"
  };

  // Fetch backends from server
  useEffect(() => {
    dispatch(fetchBackends());
  }, [dispatch]);

  // =========== ADD BACKEND ===============
  const handleAddBackend = async () => {
    if (!formData.name || !formData.url) {
      toast.error("Both name and URL are required!");
      return;
    }

    try {
      await dispatch(addBackend(formData)).unwrap();
      toast.success("Backend added successfully!");

      setFormData({ name: "", url: "" });
      setIsAddDialogOpen(false);
    } catch (err) {
      toast.error(err || "Failed to add backend");
    }
  };

  // ============ EDIT BACKEND ===============
  const handleEditBackend = async () => {
  if (!selectedBackend) return;
  if (!formData.name || !formData.url) {
    toast.error("Both name and URL are required!");
    return;
  }
  try {
    await dispatch(updateBackend({ id: selectedBackend._id, data: formData })).unwrap();
    toast.success("Backend updated successfully!");

    setFormData({ name: "", url: "" });
    setSelectedBackend(null);
    setIsEditDialogOpen(false);
  } catch (err) {
    toast.error(err || "Failed to update backend");
  }
};

  // =============== DELETE BACKEND ============
const handleDeleteBackend = async () => {
  if (!selectedBackend) return;
  try {
    await dispatch(deleteBackend(selectedBackend._id)).unwrap();
    toast.success("Backend deleted successfully!");

    setSelectedBackend(null);
    setIsDeleteDialogOpen(false);
  } catch (err) {
    toast.error(err || "Failed to delete backend");
  }
};


  const openEditDialog = (backend) => {
    setSelectedBackend(backend);
    setFormData({ name: backend.name, url: backend.url });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (backend) => {
    setSelectedBackend(backend);
    setIsDeleteDialogOpen(true);
  };

  // ========= LOGOUT ===============
  const handleLogout = () => {
    toast.success("Logged out");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col">
        <Header
          user={user}
          onChangePassword={() => alert("Change password feature is not implemented yet!")}
          onLogout={handleLogout}
        />

        {/* Loading + Error UI */}
        {loading && (
          <div className="p-6 text-center text-gray-600">Loading backend servers...</div>
        )}

        {error && (
          <div className="p-6 text-center text-red-600">
            Failed to fetch backend servers: {error}
          </div>
        )}

        {/* Stats */}
        <StatsGrid backends={backends} />

        {/* Table */}
        <div className="flex-1 p-6">
          <BackendTable
            backends={backends}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
            onAdd={() => setIsAddDialogOpen(true)}
          />
        </div>
      </div>

      {/* Add Backend */}
      <BackendFormDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddBackend}
        formData={formData}
        setFormData={setFormData}
        mode="add"
      />

      {/* Edit Backend */}
      <BackendFormDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditBackend}
        formData={formData}
        setFormData={setFormData}
        mode="edit"
      />

      {/* Delete Backend */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteBackend}
        backendName={selectedBackend?.name}
      />
    </div>
  );
}
