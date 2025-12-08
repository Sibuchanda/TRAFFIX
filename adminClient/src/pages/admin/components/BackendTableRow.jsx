import { Button } from "@/components/ui/button";
import { Edit, Trash2, CheckCircle, XCircle, Clock } from "lucide-react";

function StatusIcon({ status }) {
  if (status === "healthy") return <CheckCircle className="h-5 w-5 text-green-600" />;
  if (status === "unhealthy") return <XCircle className="h-5 w-5 text-red-600" />;
  return <Clock className="h-5 w-5 text-yellow-600" />;
}

export default function BackendTableRow({ backend, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <StatusIcon status={backend.status} />
          <span className="text-sm capitalize">{backend.status}</span>
        </div>
      </td>
      <td className="py-4 px-4 font-medium">{backend.name}</td>
      <td className="py-4 px-4 text-gray-600">{backend.url}</td>
      <td className="py-4 px-4 text-gray-600">
        {new Date(backend.createdAt).toLocaleDateString()}
      </td>
      <td className="py-4 px-4">
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(backend)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(backend)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}