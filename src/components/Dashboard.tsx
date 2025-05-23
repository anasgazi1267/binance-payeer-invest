
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, DollarSign, BanknoteIcon, Users } from "lucide-react";

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
            <CardTitle className="text-sm font-medium text-white/80">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${stats.totalBalance.toFixed(2)}</span>
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Active Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stats.activeInvestments}</span>
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <BanknoteIcon className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Referral Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${stats.referralBalance.toFixed(2)}</span>
              <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-400" />
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{stats.referralCount}</span>
              </div>
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
            <p className="text-white/80">Start your investment journey with a minimum deposit of $1.00</p>
            <Button 
              onClick={onDeposit}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
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
            <p className="text-white/80">Withdraw your earnings with a minimum of $1.50</p>
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
          <div className="text-center py-8 text-white/80">
            No transactions yet. Make your first deposit to get started!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
