
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal = ({ isOpen, onClose }: DepositModalProps) => {
  const [amount, setAmount] = useState("");
  const [selectedMethodId, setSelectedMethodId] = useState("");
  const [step, setStep] = useState(1);
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: paymentMethods } = useQuery({
    queryKey: ['payment_methods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('is_active', true);
      if (error) throw error;
      return data;
    }
  });

  const depositMutation = useMutation({
    mutationFn: async (depositData: any) => {
      const { data, error } = await supabase
        .from('deposits')
        .insert(depositData)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      toast({
        title: "Deposit Submitted",
        description: "Your deposit request has been submitted for processing",
        className: "bg-slate-800 border-green-500/30 text-white"
      });
      handleClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit deposit request",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
    }
  });

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
      className: "bg-slate-800 border-green-500/30 text-white"
    });
  };

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) < 1) {
      toast({
        title: "Invalid Amount",
        description: "Minimum deposit is $1.00",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    if (!selectedMethodId) {
      toast({
        title: "Select Payment Method",
        description: "Please select a payment method",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    setStep(2);
  };

  const handleSubmitTransaction = () => {
    if (!transactionId) {
      toast({
        title: "Transaction ID Required",
        description: "Please enter your transaction ID",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    if (!user) return;

    depositMutation.mutate({
      user_id: user.id,
      amount: parseFloat(amount),
      payment_method_id: selectedMethodId,
      transaction_id: transactionId,
      status: 'pending'
    });
  };

  const handleClose = () => {
    setStep(1);
    setAmount("");
    setSelectedMethodId("");
    setTransactionId("");
    setScreenshot(null);
    onClose();
  };

  const selectedMethod = paymentMethods?.find(m => m.id === selectedMethodId);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900 border-indigo-500/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Make a Deposit</DialogTitle>
        </DialogHeader>
        
        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <Label htmlFor="amount" className="text-white text-sm">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Minimum $1.00"
                className="bg-white/10 border-indigo-500/30 text-white placeholder:text-white/50"
                min="1"
                step="0.01"
              />
            </div>

            <div>
              <Label className="text-white text-sm mb-3 block">Select Payment Method</Label>
              <div className="grid gap-3">
                {paymentMethods?.map((method) => (
                  <Card 
                    key={method.id}
                    className={`cursor-pointer transition-all ${
                      selectedMethodId === method.id 
                        ? "bg-indigo-600/30 border-indigo-500" 
                        : "bg-white/5 border-white/20 hover:bg-white/10"
                    }`}
                    onClick={() => setSelectedMethodId(method.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white">{method.name}</h3>
                          <p className="text-sm text-white/70">{method.identifier}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(method.identifier, method.name);
                          }}
                          className="border-indigo-500/30 bg-indigo-500/20 text-white hover:bg-indigo-500/30"
                        >
                          <Copy className="h-4 w-4 mr-1" />
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
                onClick={handleClose}
                className="flex-1 border-indigo-500/30 bg-slate-800/50 text-white hover:bg-indigo-500/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeposit}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-300 mb-2">Payment Details</h3>
              <p className="text-white/80">Method: {selectedMethod?.name}</p>
              <p className="text-white/80">Address/ID: {selectedMethod?.identifier}</p>
              <p className="text-white/80">Amount: ${amount}</p>
            </div>

            <div>
              <Label htmlFor="transactionId" className="text-white text-sm">Transaction ID</Label>
              <Input
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your transaction ID"
                className="bg-white/10 border-indigo-500/30 text-white placeholder:text-white/50"
              />
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="flex-1 border-indigo-500/30 bg-slate-800/50 text-white hover:bg-indigo-500/10"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmitTransaction}
                disabled={depositMutation.isPending}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
              >
                {depositMutation.isPending ? 'Submitting...' : 'Submit Deposit'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
