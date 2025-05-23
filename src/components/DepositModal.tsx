
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal = ({ isOpen, onClose }: DepositModalProps) => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const { toast } = useToast();

  const depositMethods = [
    {
      id: "binance",
      name: "Binance Pay",
      id_value: "787819330",
      description: "Pay using Binance Pay ID"
    },
    {
      id: "payeer",
      name: "Payeer",
      id_value: "P1102512228",
      description: "Pay using Payeer ID"
    },
    {
      id: "usdt",
      name: "USDT TRC20",
      id_value: "TCCKVuxCKBSufSiKb5jKLtwq9DNRK77dKm",
      description: "Send USDT to TRC20 address"
    }
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) < 1) {
      toast({
        title: "Invalid Amount",
        description: "Minimum deposit is $1.00",
        variant: "destructive"
      });
      return;
    }

    if (!selectedMethod) {
      toast({
        title: "Select Payment Method",
        description: "Please select a payment method",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Deposit Initiated",
      description: `Please complete the payment using the copied ${selectedMethod} details`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Make a Deposit</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="amount" className="text-white/70">Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Minimum $1.00"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              min="1"
              step="0.01"
            />
          </div>

          <div>
            <Label className="text-white/70 mb-3 block">Select Payment Method</Label>
            <div className="space-y-3">
              {depositMethods.map((method) => (
                <Card 
                  key={method.id}
                  className={`cursor-pointer transition-all ${
                    selectedMethod === method.id 
                      ? "bg-purple-500/20 border-purple-500" 
                      : "bg-white/5 border-white/20 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-white">{method.name}</h3>
                        <p className="text-sm text-white/70">{method.description}</p>
                        <p className="text-xs text-white/50 mt-1">{method.id_value}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(method.id_value, method.name);
                        }}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Copy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
              onClick={handleDeposit}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Confirm Deposit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
