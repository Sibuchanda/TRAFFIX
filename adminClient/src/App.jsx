import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/auth/Home";
import AuthPage from "./pages/auth/Authpage";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./pages/auth/ProtectRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAdminDetails } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAdminDetails());
  },[dispatch]);
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/login' element={<AuthPage/>}></Route>
      <Route path='/admin-dashboard' element={
        <ProtectedRoute>
          <AdminDashboard/>
        </ProtectedRoute>
      }>
      </Route>
    </Routes>
    <Toaster position="top-center" />
    </>
  );
}

export default App;
