
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Package, Users, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Transactions = () => {
  const { user } = useAuth();

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const { data: deposits = [] } = useQuery({
    queryKey: ['user_deposits', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('deposits')
        .select(`
          *,
          payment_methods (name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const { data: withdrawals = [] } = useQuery({
    queryKey: ['user_withdrawals', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('withdrawals')
        .select(`
          *,
          payment_methods (name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const { data: userPackages = [] } = useQuery({
    queryKey: ['user_packages_history', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_packages')
        .select(`
          *,
          investment_packages (name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Combine all transactions into one array with proper typing
  const allTransactions = [
    ...deposits.map(d => ({
      id: d.id,
      type: 'deposit' as const,
      amount: d.amount,
      status: d.status,
      method: d.payment_methods?.name || 'Unknown',
      date: new Date(d.created_at || '').toLocaleDateString(),
      time: new Date(d.created_at || '').toLocaleTimeString(),
      txId: d.transaction_id,
      created_at: d.created_at
    })),
    ...withdrawals.map(w => ({
      id: w.id,
      type: 'withdrawal' as const,
      amount: w.amount,
      status: w.status,
      method: w.payment_methods?.name || 'Unknown',
      date: new Date(w.created_at || '').toLocaleDateString(),
      time: new Date(w.created_at || '').toLocaleTimeString(),
      address: w.payment_address,
      created_at: w.created_at
    })),
    ...userPackages.map(p => ({
      id: p.id,
      type: 'package' as const,
      amount: p.amount,
      status: p.status,
      packageName: p.investment_packages?.name || 'Unknown Package',
      date: new Date(p.created_at || '').toLocaleDateString(),
      time: new Date(p.created_at || '').toLocaleTimeString(),
      totalEarned: p.total_earned,
      created_at: p.created_at
    })),
    ...transactions.map(t => ({
      id: t.id,
      type: t.type as 'referral' | 'bonus' | 'interest',
      amount: t.amount,
      status: 'completed' as const,
      description: t.description,
      date: new Date(t.created_at || '').toLocaleDateString(),
      time: new Date(t.created_at || '').toLocaleTimeString(),
      created_at: t.created_at
    }))
  ].sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": 
      case "completed": 
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "rejected": 
      case "failed": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit": return <ArrowDown className="h-5 w-5 text-green-400" />;
      case "withdrawal": return <ArrowUp className="h-5 w-5 text-red-400" />;
      case "package": return <Package className="h-5 w-5 text-blue-400" />;
      case "referral": 
      case "bonus": return <Users className="h-5 w-5 text-purple-400" />;
      default: return <Calendar className="h-5 w-5 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "deposit": return "Deposit";
      case "withdrawal": return "Withdrawal";
      case "package": return "Package Purchase";
      case "referral": return "Referral Bonus";
      case "bonus": return "Bonus";
      case "interest": return "Interest Payment";
      default: return "Transaction";
    }
  };

  // Calculate totals
  const totalDeposits = deposits
    .filter(d => d.status === 'approved')
    .reduce((sum, d) => sum + d.amount, 0);

  const totalWithdrawals = withdrawals
    .filter(w => w.status === 'approved')
    .reduce((sum, w) => sum + w.amount, 0);

  const activePackagesCount = userPackages
    .filter(p => p.status === 'active').length;

  const referralEarnings = transactions
    .filter(t => t.type === 'referral' || t.type === 'bonus')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Transaction History</h2>
        <p className="text-white/70">
          Track all your deposits, withdrawals, package purchases, and referral earnings
        </p>
      </div>

      {allTransactions.length === 0 ? (
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="text-center py-12">
            <Calendar className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
            <p className="text-white/70">Your transaction history will appear here once you start investing.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {allTransactions.map((transaction) => (
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
                      {'method' in transaction && transaction.method && (
                        <p className="text-white/60 text-sm">via {transaction.method}</p>
                      )}
                      {'packageName' in transaction && transaction.packageName && (
                        <p className="text-blue-400 text-sm">{transaction.packageName}</p>
                      )}
                      {'description' in transaction && transaction.description && (
                        <p className="text-purple-400 text-sm">{transaction.description}</p>
                      )}
                      {'txId' in transaction && transaction.txId && (
                        <p className="text-white/50 text-xs font-mono">ID: {transaction.txId}</p>
                      )}
                      {'address' in transaction && transaction.address && (
                        <p className="text-white/50 text-xs">Address: {transaction.address}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-2xl font-bold mb-2 ${
                      transaction.type === 'withdrawal' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount.toFixed(2)}
                    </div>
                    <Badge className={`${getStatusColor(transaction.status)} border`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Badge>
                    {'totalEarned' in transaction && transaction.totalEarned !== null && (
                      <p className="text-green-400 text-sm mt-1">
                        Earned: ${transaction.totalEarned}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-500/10 border-green-500/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-400">Total Deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">${totalDeposits.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-red-500/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-400">Total Withdrawals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">${totalWithdrawals.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-400">Active Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{activePackagesCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-purple-500/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-400">Referral Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">${referralEarnings.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
