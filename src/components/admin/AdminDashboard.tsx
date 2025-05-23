
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, ArrowUpDown, Package, TrendingUp, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin_stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_stats')
        .select('*')
        .single();
      if (error) throw error;
      return data;
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-red-100">
          Monitor and manage all platform activities from this central dashboard.
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-300 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-300">
              {stats?.total_users || 0}
            </div>
            <p className="text-blue-200/70 text-sm">Registered accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-300 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Total Deposits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-300">
              ${Number(stats?.total_deposits || 0).toFixed(2)}
            </div>
            <p className="text-green-200/70 text-sm">Approved deposits</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-300 flex items-center">
              <TrendingDown className="h-4 w-4 mr-2" />
              Total Withdrawals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-300">
              ${Number(stats?.total_withdrawals || 0).toFixed(2)}
            </div>
            <p className="text-red-200/70 text-sm">Approved withdrawals</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-300 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Pending Deposits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-300">
              {stats?.pending_deposits || 0}
            </div>
            <p className="text-yellow-200/70 text-sm">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-300 flex items-center">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Pending Withdrawals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-300">
              {stats?.pending_withdrawals || 0}
            </div>
            <p className="text-orange-200/70 text-sm">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-300 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Active Packages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-300">
              {stats?.active_packages || 0}
            </div>
            <p className="text-purple-200/70 text-sm">Investment packages</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <span className="text-yellow-300">Pending Deposits</span>
                <span className="font-bold text-yellow-300">{stats?.pending_deposits || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <span className="text-orange-300">Pending Withdrawals</span>
                <span className="font-bold text-orange-300">{stats?.pending_withdrawals || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Database Status</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">API Status</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Last Updated</span>
                <span className="text-white/50 text-sm">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
