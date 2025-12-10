import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Key, LogOut } from "lucide-react";

export default function UserProfileDropdown({ admin, onChangePassword, onLogout }) {
  if (!admin) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {admin.name?.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="text-left">
            <div className="text-sm font-medium">{admin.name}</div>
            <div className="text-xs text-gray-500">{admin.role}</div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{admin.name}</p>
            <p className="text-xs text-gray-500">{admin.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onChangePassword}>
          <Key className="mr-2 h-4 w-4" />
          <span className="cursor-pointer">Change Password</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4"/>
          <span className="cursor-pointer">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
