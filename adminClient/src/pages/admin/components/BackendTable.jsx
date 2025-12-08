import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import BackendTableRow from "./BackendTableRow";

export default function BackendTable({ backends, onEdit, onDelete, onAdd }) {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Backend Servers</CardTitle>
            <CardDescription>Manage and monitor your backend server infrastructure</CardDescription>
          </div>
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Server
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">URL</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Created</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backends.map((backend) => (
                <BackendTableRow
                  key={backend._id}
                  backend={backend}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}