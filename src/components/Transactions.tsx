
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Package, Users, Calendar } from "lucide-react";

export const Transactions = () => {
  const [transactions] = useState([
    {
      id: "1",
      type: "deposit",
      amount: 50,
      status: "completed",
      method: "Binance Pay",
      date: "2024-01-15",
      time: "14:30",
      txId: "BP123456789"
    },
    {
      id: "2",
      type: "package",
      amount: 50,
      status: "active",
      packageName: "Standard Package",
      date: "2024-01-15",
      time: "14:35",
      returns: 315
    },
    {
      id: "3",
      type: "referral",
      amount: 0.20,
      status: "completed",
      referredUser: "user123",
      date: "2024-01-14",
      time: "09:15"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "active": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "failed": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit": return <ArrowDown className="h-5 w-5 text-green-400" />;
      case "withdrawal": return <ArrowUp className="h-5 w-5 text-red-400" />;
      case "package": return <Package className="h-5 w-5 text-blue-400" />;
      case "referral": return <Users className="h-5 w-5 text-purple-400" />;
      default: return <Calendar className="h-5 w-5 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "deposit": return "Deposit";
      case "withdrawal": return "Withdrawal";
      case "package": return "Package Purchase";
      case "referral": return "Referral Bonus";
      default: return "Transaction";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Transaction History</h2>
        <p className="text-white/70">
          Track all your deposits, withdrawals, package purchases, and referral earnings
        </p>
      </div>

      {transactions.length === 0 ? (
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="text-center py-12">
            <Calendar className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
            <p className="text-white/70">Your transaction history will appear here once you start investing.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/10 rounded-full">
                      {getTypeIcon(transaction.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{getTypeLabel(transaction.type)}</h3>
                      <p className="text-white/70 text-sm">
                        {transaction.date} at {transaction.time}
                      </p>
                      {transaction.method && (
                        <p className="text-white/60 text-sm">via {transaction.method}</p>
                      )}
                      {transaction.packageName && (
                        <p className="text-blue-400 text-sm">{transaction.packageName}</p>
                      )}
                      {transaction.referredUser && (
                        <p className="text-purple-400 text-sm">Referred: {transaction.referredUser}</p>
                      )}
                      {transaction.txId && (
                        <p className="text-white/50 text-xs font-mono">ID: {transaction.txId}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      ${transaction.amount.toFixed(2)}
                    </div>
                    <Badge className={`${getStatusColor(transaction.status)} border`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                    {transaction.returns && (
                      <p className="text-green-400 text-sm mt-1">
                        Expected: ${transaction.returns}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-500/10 border-green-500/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-400">Total Deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">$50.00</div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-400">Active Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">1</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-purple-500/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-400">Referral Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">$0.20</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
