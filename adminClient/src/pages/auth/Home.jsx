import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Activity, Shield, Server, BarChart3, Settings } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track server health, response times, and traffic distribution in real-time"
    },
    {
      icon: Shield,
      title: "High Availability",
      description: "Automatic failover and health checks ensure maximum uptime for your services"
    },
    {
      icon: Server,
      title: "Server Management",
      description: "Add, remove, and configure backend servers with granular control"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Comprehensive metrics and logs for informed decision making"
    },
    {
      icon: Settings,
      title: "Flexible Configuration",
      description: "Customize load balancing strategies and policies to meet your needs"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===  Header  ==== */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">TRAFFIX</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")}
              className="border-gray-300 cursor-pointer"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Load Balancing Administration
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Centralized management console for your load balancing infrastructure. 
              Monitor performance, manage backend servers, and ensure high availability 
              with enterprise-grade tools and insights.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/login")}
              className="px-8 py-6 text-lg cursor-pointer"
            >
              Access Admin Console
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Key Capabilities
          </h3>
          <p className="text-gray-600">
            Everything you need to manage and optimize your load balancing infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.99%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">&lt;50ms</div>
              <div className="text-gray-600">Average Latency</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">System Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm">
            <p>&copy; {new Date().getFullYear()} TRAFFIX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}