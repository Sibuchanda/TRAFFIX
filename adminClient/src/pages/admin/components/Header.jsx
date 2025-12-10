import UserProfileDropdown from "./UserProfileDropdown";

export default function Header({ admin, onChangePassword, onLogout }) {
 if (!admin) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="text-sm text-gray-500">Loading admin...</div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Backend Servers</h1>
          <p className="text-sm text-gray-600">Manage your load balancer backend infrastructure</p>
        </div>
        <UserProfileDropdown 
          admin={admin} 
          onChangePassword={onChangePassword} 
          onLogout={onLogout} 
        />
      </div>
    </header>
  );
}