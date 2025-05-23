
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawModal = ({ isOpen, onClose }: WithdrawModalProps) => {
  const [amount, setAmount] = useState("");
  const [methodId, setMethodId] = useState("");
  const [address, setAddress] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const { balance } = useUserData();
  const queryClient = useQueryClient();

  const withdrawMutation = useMutation({
    mutationFn: async (withdrawData: any) => {
      const { data, error } = await supabase
        .from('withdrawals')
        .insert(withdrawData)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      toast({
        title: "Withdrawal Submitted",
        description: "Your withdrawal request has been submitted for processing",
        className: "bg-slate-800 border-green-500/30 text-white"
      });
      handleClose();
    },
    onError: () => {
      toast({
        title: "Error", 
        description: "Failed to submit withdrawal request",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
    }
  });

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) < 0.5) {
      toast({
        title: "Invalid Amount",
        description: "Minimum withdrawal is $0.50",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    const withdrawAmount = parseFloat(amount);
    const availableBalance = (balance?.main_balance || 0) + (balance?.referral_balance || 0);
    
    if (withdrawAmount > availableBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    if (!methodId || !address) {
      toast({
        title: "Missing Information",
        description: "Please select withdrawal method and enter address/ID",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    if (!user) return;

    withdrawMutation.mutate({
      user_id: user.id,
      amount: withdrawAmount,
      payment_method_id: methodId,
      payment_address: address,
      status: 'pending'
    });
  };

  const handleClose = () => {
    setAmount("");
    setMethodId("");
    setAddress("");
    onClose();
  };

  const availableBalance = (balance?.main_balance || 0) + (balance?.referral_balance || 0);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-emerald-500/30 text-white max-w-md backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Withdraw Funds
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4">
            <p className="text-emerald-300 text-sm">
              Available Balance: ${availableBalance.toFixed(2)}
            </p>
          </div>

          <div>
            <Label htmlFor="withdraw-amount" className="text-gray-300 font-medium">Amount (USD)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Minimum $0.50"
              className="mt-2 bg-slate-700/50 border-emerald-500/30 text-white placeholder:text-gray-400 focus:border-emerald-400"
              min="0.5"
              step="0.01"
              max={availableBalance}
            />
          </div>

          <div>
            <Label className="text-gray-300 font-medium">Withdrawal Method</Label>
            <Select value={methodId} onValueChange={setMethodId}>
              <SelectTrigger className="mt-2 bg-slate-700/50 border-emerald-500/30 text-white focus:border-emerald-400">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-emerald-500/30 text-white">
                <SelectItem value="binance" className="focus:bg-emerald-500/20">Binance Pay</SelectItem>
                <SelectItem value="payeer" className="focus:bg-emerald-500/20">Payeer</SelectItem>
                <SelectItem value="usdt" className="focus:bg-emerald-500/20">USDT TRC20</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="address" className="text-gray-300 font-medium">
              {methodId === "binance" ? "Binance Pay ID" : 
               methodId === "payeer" ? "Payeer ID" : 
               methodId === "usdt" ? "USDT TRC20 Address" : "Address/ID"}
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`Enter your ${methodId} ${methodId === "usdt" ? "address" : "ID"}`}
              className="mt-2 bg-slate-700/50 border-emerald-500/30 text-white placeholder:text-gray-400 focus:border-emerald-400"
            />
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4">
            <p className="text-emerald-300 text-sm leading-relaxed">
              ⚠️ Withdrawals are processed within 24-48 hours. Please ensure your address/ID is correct.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1 border-slate-600 bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleWithdraw}
              disabled={withdrawMutation.isPending}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold"
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              {withdrawMutation.isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
