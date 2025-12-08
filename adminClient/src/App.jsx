import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/auth/Home";
import AuthPage from "./pages/auth/Authpage";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/login' element={<AuthPage/>}></Route>
      <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
    </Routes>
    <Toaster position="top-center" />
    </>
  );
}

export default App;
