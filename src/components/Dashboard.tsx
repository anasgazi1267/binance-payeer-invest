
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Users, DollarSign, Package, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface DashboardProps {
  onDeposit: () => void;
  onWithdraw: () => void;
}

export const Dashboard = ({ onDeposit, onWithdraw }: DashboardProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Dashboard
        </h2>
        <p className="text-gray-300 text-lg">Welcome to your investment overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white hover:border-indigo-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Balance</CardTitle>
            <Wallet className="h-5 w-5 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              $0.00
            </div>
            <p className="text-xs text-gray-500 mt-1">Available for withdrawal</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white hover:border-purple-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Packages</CardTitle>
            <Package className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">0</div>
            <p className="text-xs text-gray-500 mt-1">Investment packages</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white hover:border-amber-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Referral Balance</CardTitle>
            <Users className="h-5 w-5 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400">$0.00</div>
            <p className="text-xs text-gray-500 mt-1">(0 referrals)</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white hover:border-cyan-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Today's Earnings</CardTitle>
            <TrendingUp className="h-5 w-5 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-400">$0.00</div>
            <p className="text-xs text-gray-500 mt-1">Daily profit</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md border-indigo-500/30 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl font-bold text-gray-100 flex items-center">
              <ArrowDownLeft className="mr-3 h-6 w-6 text-indigo-400" />
              Make a Deposit
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-gray-300 mb-6 leading-relaxed">
              Start your investment journey with a minimum deposit of <span className="text-indigo-400 font-semibold">$1.00</span>. 
              Choose from multiple payment methods including <span className="text-indigo-400 font-semibold">Binance Pay</span>, 
              <span className="text-indigo-400 font-semibold"> Payeer</span>, and <span className="text-indigo-400 font-semibold">USDT</span>.
            </p>
            <Button 
              onClick={onDeposit}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <DollarSign className="mr-2 h-5 w-5" />
              Deposit Funds
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 backdrop-blur-md border-emerald-500/30 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl font-bold text-gray-100 flex items-center">
              <ArrowUpRight className="mr-3 h-6 w-6 text-emerald-400" />
              Withdraw Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-gray-300 mb-6 leading-relaxed">
              Withdraw your earnings anytime with a minimum of <span className="text-emerald-400 font-semibold">$0.50</span>. 
              Fast processing within <span className="text-emerald-400 font-semibold">24-48 hours</span> to your preferred payment method.
            </p>
            <Button 
              onClick={onWithdraw}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <ArrowUpRight className="mr-2 h-5 w-5" />
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-100">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-400">
            <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No recent activity</p>
            <p className="text-sm mt-2">Your transactions and earnings will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
