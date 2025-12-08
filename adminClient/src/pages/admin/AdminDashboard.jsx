import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import BackendTable from "./components/BackendTable";
import BackendFormDialog from "./components/BackendFormDialog";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import ChangePasswordDialog from "./components/ChangePasswordDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchBackends } from "@/redux/backendSlice";
import { addBackend } from "@/redux/backendSlice";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const {backends, loading, error } = useSelector((state)=> state.backends);
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [selectedBackend, setSelectedBackend] = useState(null);
  const [formData, setFormData] = useState({ name: "", url: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const user = {
    name: "John Doe",
    email: "admin@traffix.com",
    role: "Administrator"
  };

   useEffect(()=>{
     dispatch(fetchBackends());
   },[dispatch]);
   
  // Add backend Handler
 const handleAddBackend = async () => {
  if (!formData.name || !formData.url) {
    toast.error("Both name and URL are required to add backend!");
    return;
  }

  try {
    const result = await dispatch(addBackend(formData)).unwrap();
    toast.success("Backend added successfully!");
    setFormData({ name: "", url: "" });
    setIsAddDialogOpen(false);
  } catch (err) {
    toast.error(err || "Failed to add backend");
  }
};


  const handleEditBackend = () => {
    setBackends(backends.map(b => 
      b._id === selectedBackend._id 
        ? { ...b, name: formData.name, url: formData.url }
        : b
    ));
    setFormData({ name: "", url: "" });
    setIsEditDialogOpen(false);
    setSelectedBackend(null);
  };

  const handleDeleteBackend = () => {
    setBackends(backends.filter(b => b._id !== selectedBackend._id));
    setIsDeleteDialogOpen(false);
    setSelectedBackend(null);
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

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Changing password...");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsPasswordDialogOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col">
        <Header 
          user={user} 
          onChangePassword={() => setIsPasswordDialogOpen(true)} 
          onLogout={handleLogout} 
        />

        <StatsGrid backends={backends} />

        <div className="flex-1 p-6">
          <BackendTable
            backends={backends}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
            onAdd={() => setIsAddDialogOpen(true)}
          />
        </div>
      </div>

      <BackendFormDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddBackend}
        formData={formData}
        setFormData={setFormData}
        mode="add"
      />

      <BackendFormDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditBackend}
        formData={formData}
        setFormData={setFormData}
        mode="edit"
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteBackend}
        backendName={selectedBackend?.name}
      />

      <ChangePasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onSubmit={handleChangePassword}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
      />
    </div>
  );
}