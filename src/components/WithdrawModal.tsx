
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawModal = ({ isOpen, onClose }: WithdrawModalProps) => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [address, setAddress] = useState("");
  const { toast } = useToast();

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) < 1.5) {
      toast({
        title: "Invalid Amount",
        description: "Minimum withdrawal is $1.50",
        variant: "destructive"
      });
      return;
    }

    if (!method || !address) {
      toast({
        title: "Missing Information",
        description: "Please select withdrawal method and enter address/ID",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Withdrawal Requested",
      description: "Your withdrawal request has been submitted for processing",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Withdraw Funds</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="withdraw-amount" className="text-white/70">Amount (USD)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Minimum $1.50"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              min="1.5"
              step="0.01"
            />
          </div>

          <div>
            <Label className="text-white/70">Withdrawal Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="binance">Binance Pay</SelectItem>
                <SelectItem value="payeer">Payeer</SelectItem>
                <SelectItem value="usdt">USDT TRC20</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="address" className="text-white/70">
              {method === "binance" ? "Binance Pay ID" : 
               method === "payeer" ? "Payeer ID" : 
               method === "usdt" ? "USDT TRC20 Address" : "Address/ID"}
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`Enter your ${method} ${method === "usdt" ? "address" : "ID"}`}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <p className="text-yellow-400 text-sm">
              ⚠️ Withdrawals are processed within 24-48 hours. Please ensure your address/ID is correct.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleWithdraw}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              Withdraw
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
