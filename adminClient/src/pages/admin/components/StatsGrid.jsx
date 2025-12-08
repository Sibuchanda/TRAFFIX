import { Server, CheckCircle, XCircle, Activity } from "lucide-react";
import StatsCard from "./StatsCard";

export default function StatsGrid({ backends }) {
  const stats = [
    { label: "Total Servers", value: backends.length, icon: Server },
    { label: "Healthy", value: backends.filter(b => b.status === "healthy").length, icon: CheckCircle },
    { label: "Unhealthy", value: backends.filter(b => b.status === "unhealthy").length, icon: XCircle },
    { label: "Uptime", value: "99.9%", icon: Activity }
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}