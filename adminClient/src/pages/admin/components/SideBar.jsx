import { Button } from "@/components/ui/button";
import { Activity, Server, Menu } from "lucide-react";

export default function Sidebar({ isOpen, onToggle }) {
  return (
    <aside className={`bg-gray-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-semibold">TRAFFIX</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-white bg-gray-800 hover:bg-gray-700"
        >
          <Server className="h-5 w-5 mr-3" />
          {isOpen && "Backend Servers"}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-gray-800"
        >
          <Activity className="h-5 w-5 mr-3" />
          {isOpen && "Analytics"}
        </Button>
      </nav>
    </aside>
  );
}