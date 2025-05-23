
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Package, Users, TrendingUp, DollarSign } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";

interface DashboardProps {
  onDeposit: () => void;
  onWithdraw: () => void;
}

export const Dashboard = ({ onDeposit, onWithdraw }: DashboardProps) => {
  const { balance, packages, referrals } = useUserData();

  const activePackagesCount = packages?.filter(pkg => pkg.status === 'active').length || 0;
  const todaysEarnings = packages?.reduce((sum, pkg) => {
    if (pkg.status === 'active' && pkg.investment_packages) {
      return sum + pkg.investment_packages.daily_return;
    }
    return sum;
  }, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Dashboard</h2>
        <p className="text-white/70">
          Welcome to your investment dashboard. Track your earnings and manage your investments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-300">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-blue-300">
                ${(balance?.main_balance || 0).toFixed(2)}
              </span>
              <div className="h-12 w-12 rounded-full bg-blue-500/30 flex items-center justify-center">
                <DollarSign className="h-7 w-7 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-300">Active Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-green-300">{activePackagesCount}</span>
              <div className="h-12 w-12 rounded-full bg-green-500/30 flex items-center justify-center">
                <Package className="h-7 w-7 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border-purple-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-300">
              Referral Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-purple-300">
                  ${(balance?.referral_balance || 0).toFixed(2)}
                </span>
                <p className="text-xs text-purple-200 mt-1">
                  ({referrals?.length || 0} referrals)
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                <Users className="h-7 w-7 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-300">
              Today's Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-orange-300">
                ${todaysEarnings.toFixed(2)}
              </span>
              <div className="h-12 w-12 rounded-full bg-orange-500/30 flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={onDeposit}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <ArrowDown className="mr-2 h-4 w-4" />
              Make a Deposit
            </Button>
            <Button
              onClick={onWithdraw}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Account Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Deposited:</span>
              <span className="text-green-400 font-semibold">
                ${(balance?.total_deposited || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Total Withdrawn:</span>
              <span className="text-blue-400 font-semibold">
                ${(balance?.total_withdrawn || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Net Profit:</span>
              <span className="text-yellow-400 font-semibold">
                ${((balance?.main_balance || 0) + (balance?.referral_balance || 0) - (balance?.total_deposited || 0)).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
