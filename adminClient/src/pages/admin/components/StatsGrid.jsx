import { Server, CheckCircle, XCircle, Activity } from "lucide-react";
import StatsCard from "./StatsCard";

export default function StatsGrid({ backends }) {
  const safeBackends = Array.isArray(backends) ? backends : [];

  const stats = [
    { label: "Total Servers", value: safeBackends.length, icon: Server },
    { label: "Healthy", value: safeBackends.filter(b => b.status === true).length, icon: CheckCircle },
    { label: "Unhealthy", value: safeBackends.filter(b => b.status === false).length, icon: XCircle },
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
