
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, DollarSign, BanknoteIcon } from "lucide-react";

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
    referralCount: 0
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${stats.totalBalance.toFixed(2)}</span>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Active Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stats.activeInvestments}</span>
              <BanknoteIcon className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Referral Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${stats.referralBalance.toFixed(2)}</span>
              <span className="text-sm text-white/70">({stats.referralCount} refs)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDown className="h-5 w-5 text-green-400" />
              Quick Deposit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/70">Start your investment journey with a minimum deposit of $1.00</p>
            <Button 
              onClick={onDeposit}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              Deposit Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUp className="h-5 w-5 text-red-400" />
              Quick Withdrawal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/70">Withdraw your earnings with a minimum of $1.50</p>
            <Button 
              onClick={onWithdraw}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-white/70">
            No transactions yet. Make your first deposit to get started!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
