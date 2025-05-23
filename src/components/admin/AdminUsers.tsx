
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Edit, DollarSign, Plus, Minus } from "lucide-react";

export const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [balanceAmount, setBalanceAmount] = useState("");
  const [balanceType, setBalanceType] = useState("main");
  const [operation, setOperation] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ['admin_users', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select(`
          *,
          user_balances (*)
        `)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`email.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    refetchInterval: 10000
  });

  const updateBalanceMutation = useMutation({
    mutationFn: async ({ userId, amount, type, operation: op }: { 
      userId: string, 
      amount: number, 
      type: string, 
      operation: string 
    }) => {
      const finalAmount = op === 'subtract' ? -amount : amount;
      
      const { error } = await supabase.rpc('update_user_balance', {
        p_user_id: userId,
        p_amount: finalAmount,
        p_balance_type: type
      });
      
      if (error) throw error;

      // Create a transaction record
      await supabase.from('transactions').insert({
        user_id: userId,
        type: 'admin_adjustment',
        amount: finalAmount,
        description: `Admin ${op} - ${type} balance adjustment`,
        balance_type: type
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_users'] });
      setBalanceAmount("");
      setSelectedUser(null);
      toast({
        title: "Balance Updated",
        description: "User balance has been updated successfully",
        className: "bg-slate-800 border-green-500/30 text-white"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update user balance",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
    }
  });

  const handleBalanceUpdate = () => {
    if (!selectedUser || !balanceAmount || parseFloat(balanceAmount) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid amount",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    updateBalanceMutation.mutate({
      userId: selectedUser.id,
      amount: parseFloat(balanceAmount),
      type: balanceType,
      operation
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
          <Users className="h-8 w-8 mr-3" />
          User Management
        </h1>
        <p className="text-blue-100">
          Manage user accounts and modify balances directly.
        </p>
      </div>

      {/* Search */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-700/50 border-white/20 text-white placeholder:text-white/50"
          />
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {users.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Users Found</h3>
              <p className="text-white/70">No users match the current search.</p>
            </CardContent>
          </Card>
        ) : (
          users.map((user) => (
            <Card key={user.id} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        {user.full_name || user.email}
                      </h3>
                      <Badge className={`${
                        user.role === 'admin' 
                          ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      } border`}>
                        {user.role}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Email:</span>
                        <div>{user.email}</div>
                      </div>
                      <div>
                        <span className="text-white/60">Main Balance:</span>
                        <div className="font-semibold text-green-400">
                          ${Number(user.user_balances?.[0]?.main_balance || 0).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <span className="text-white/60">Referral Balance:</span>
                        <div className="font-semibold text-purple-400">
                          ${Number(user.user_balances?.[0]?.referral_balance || 0).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <span className="text-white/60">Total Deposited:</span>
                        <div className="font-semibold text-blue-400">
                          ${Number(user.user_balances?.[0]?.total_deposited || 0).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setSelectedUser(user)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modify Balance
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-blue-500/30 text-white">
                        <DialogHeader>
                          <DialogTitle>Modify User Balance</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>User</Label>
                            <div className="p-2 bg-slate-700/50 rounded border">
                              {selectedUser?.full_name || selectedUser?.email}
                            </div>
                          </div>
                          
                          <div>
                            <Label>Operation</Label>
                            <Select value={operation} onValueChange={setOperation}>
                              <SelectTrigger className="bg-slate-700/50 border-white/20 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-white/20 text-white">
                                <SelectItem value="add">Add Balance</SelectItem>
                                <SelectItem value="subtract">Subtract Balance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Balance Type</Label>
                            <Select value={balanceType} onValueChange={setBalanceType}>
                              <SelectTrigger className="bg-slate-700/50 border-white/20 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-white/20 text-white">
                                <SelectItem value="main">Main Balance</SelectItem>
                                <SelectItem value="referral">Referral Balance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Amount</Label>
                            <Input
                              type="number"
                              value={balanceAmount}
                              onChange={(e) => setBalanceAmount(e.target.value)}
                              placeholder="Enter amount"
                              className="bg-slate-700/50 border-white/20 text-white"
                              min="0"
                              step="0.01"
                            />
                          </div>

                          <Button
                            onClick={handleBalanceUpdate}
                            disabled={updateBalanceMutation.isPending}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          >
                            {operation === 'add' ? <Plus className="h-4 w-4 mr-2" /> : <Minus className="h-4 w-4 mr-2" />}
                            {updateBalanceMutation.isPending ? 'Updating...' : `${operation === 'add' ? 'Add' : 'Subtract'} Balance`}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
