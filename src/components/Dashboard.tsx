
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, DollarSign, BanknoteIcon, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  onDeposit: () => void;
  onWithdraw: () => void;
}

export const Dashboard = ({ onDeposit, onWithdraw }: DashboardProps) => {
  const [stats] = useState({
    totalBalance: 0.00,
    totalDeposits: 0.00,
    totalWithdrawals: 0.00,
    activeInvestments: 0,
    referralBalance: 0.00,
    referralCount: 0,
    todayEarnings: 0.00
  });
  const navigate = useNavigate();

  const handleWallet = () => {
    navigate('/wallet');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Your Dashboard!</h2>
        <p className="text-green-100">
          Start your investment journey by making your first deposit. Choose from our premium packages 
          and watch your money grow with guaranteed daily returns.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-400">${stats.totalBalance.toFixed(2)}</span>
              <div className="h-10 w-10 rounded-full bg-green-500/30 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Active Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-400">{stats.activeInvestments}</span>
              <div className="h-10 w-10 rounded-full bg-blue-500/30 flex items-center justify-center">
                <BanknoteIcon className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Referral Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-purple-400">${stats.referralBalance.toFixed(2)}</span>
                <div className="text-xs text-purple-200">({stats.referralCount} referrals)</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/30 flex items-center justify-center relative">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Today's Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-orange-400">${stats.todayEarnings.toFixed(2)}</span>
              <div className="h-10 w-10 rounded-full bg-orange-500/30 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <ArrowDown className="h-5 w-5" />
              Make a Deposit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-cyan-200">
              Start your investment journey with a minimum deposit of $1.00. 
              Choose from multiple payment methods including Binance Pay, Payeer, and USDT.
            </p>
            <Button 
              onClick={handleWallet}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold"
            >
              Deposit Funds
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <ArrowUp className="h-5 w-5" />
              Withdraw Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-amber-200">
              Withdraw your earnings anytime with a minimum of $1.50. 
              Fast processing within 24-48 hours to your preferred payment method.
            </p>
            <Button 
              onClick={handleWallet}
              variant="outline"
              className="w-full border-amber-400/50 text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 font-semibold"
            >
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="bg-white/5 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-white">Investment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">${stats.totalDeposits.toFixed(2)}</div>
              <div className="text-sm text-white/70">Total Deposits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">${stats.totalWithdrawals.toFixed(2)}</div>
              <div className="text-sm text-white/70">Total Withdrawals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                ${(stats.totalBalance + stats.referralBalance).toFixed(2)}
              </div>
              <div className="text-sm text-white/70">Available Balance</div>
            </div>
          </div>
          
          {stats.activeInvestments === 0 && (
            <div className="text-center mt-6 py-6 border-t border-white/20">
              <p className="text-white/70 mb-4">
                🚀 Ready to start earning? Browse our investment packages and choose the one that fits your goals!
              </p>
              <Button
                onClick={handleWallet}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
              >
                View Investment Packages
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
