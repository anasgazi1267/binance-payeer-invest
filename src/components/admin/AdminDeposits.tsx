
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, DollarSign } from "lucide-react";

export const AdminDeposits = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: deposits = [] } = useQuery({
    queryKey: ['admin_deposits', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('deposits')
        .select(`
          *,
          payment_methods (name)
        `)
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data: depositsData, error } = await query;
      if (error) throw error;

      // Get user profiles separately
      const userIds = depositsData?.map(d => d.user_id).filter(Boolean) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);

      // Merge the data
      const depositsWithProfiles = depositsData?.map(deposit => ({
        ...deposit,
        profile: profiles?.find(p => p.id === deposit.user_id)
      }));

      return depositsWithProfiles || [];
    },
    refetchInterval: 10000
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: string, status: string, adminNotes?: string }) => {
      const updateData: any = { status, updated_at: new Date().toISOString() };
      if (adminNotes) updateData.admin_notes = adminNotes;

      const { error } = await supabase
        .from('deposits')
        .update(updateData)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_deposits'] });
      queryClient.invalidateQueries({ queryKey: ['admin_stats'] });
      toast({
        title: "Status Updated",
        description: "Deposit status has been updated successfully",
        className: "bg-slate-800 border-green-500/30 text-white"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update deposit status",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
          <DollarSign className="h-8 w-8 mr-3" />
          Deposit Management
        </h1>
        <p className="text-green-100">
          Review and approve deposit requests from users.
        </p>
      </div>

      {/* Filter Controls */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle>Filter Deposits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-slate-700/50 border-white/20 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20 text-white">
                <SelectItem value="all">All Deposits</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Deposits List */}
      <div className="space-y-4">
        {deposits.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="text-center py-12">
              <DollarSign className="h-16 w-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Deposits Found</h3>
              <p className="text-white/70">No deposits match the current filter.</p>
            </CardContent>
          </Card>
        ) : (
          deposits.map((deposit) => (
            <Card key={deposit.id} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(deposit.status)}
                      <h3 className="text-lg font-semibold">
                        {deposit.profile?.full_name || deposit.profile?.email || 'Unknown User'}
                      </h3>
                      <Badge className={`${getStatusColor(deposit.status)} border`}>
                        {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Amount:</span>
                        <div className="font-semibold text-green-400">${deposit.amount}</div>
                      </div>
                      <div>
                        <span className="text-white/60">Method:</span>
                        <div>{deposit.payment_methods?.name || 'Unknown'}</div>
                      </div>
                      <div>
                        <span className="text-white/60">Transaction ID:</span>
                        <div className="font-mono text-xs">{deposit.transaction_id || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-white/60">Date:</span>
                        <div>{new Date(deposit.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>

                    {deposit.admin_notes && (
                      <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <span className="text-blue-300 text-sm font-medium">Admin Notes:</span>
                        <p className="text-white/80 text-sm mt-1">{deposit.admin_notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    {deposit.status === 'pending' && (
                      <>
                        <Button
                          onClick={() => updateStatusMutation.mutate({ id: deposit.id, status: 'approved' })}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={updateStatusMutation.isPending}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => updateStatusMutation.mutate({ id: deposit.id, status: 'rejected' })}
                          className="bg-red-600 hover:bg-red-700 text-white"
                          disabled={updateStatusMutation.isPending}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
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
