
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Upload, CreditCard, Wallet, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal = ({ isOpen, onClose }: DepositModalProps) => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [step, setStep] = useState(1);
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const { toast } = useToast();

  const depositMethods = [
    {
      id: "binance",
      name: "Binance Pay",
      id_value: "787819330",
      description: "Pay using Binance Pay ID",
      icon: <CreditCard className="h-10 w-10 text-yellow-400" />
    },
    {
      id: "payeer",
      name: "Payeer",
      id_value: "P1102512228",
      description: "Pay using Payeer ID",
      icon: <Wallet className="h-10 w-10 text-blue-400" />
    },
    {
      id: "usdt",
      name: "USDT TRC20",
      id_value: "TCCKVuxCKBSufSiKb5jKLtwq9DNRK77dKm",
      description: "Send USDT to TRC20 address",
      icon: <CreditCard className="h-10 w-10 text-green-400" />
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

    setStep(2);
  };

  const handleSubmitTransaction = () => {
    if (!transactionId) {
      toast({
        title: "Transaction ID Required",
        description: "Please enter your transaction ID",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Deposit Submitted",
      description: "Your deposit request has been submitted for processing",
    });
    
    // Reset and close
    setStep(1);
    setAmount("");
    setSelectedMethod("");
    setTransactionId("");
    setScreenshot(null);
    onClose();
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-indigo-500/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Make a Deposit - Cashjo</DialogTitle>
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
              <p className="text-xs text-white/70 mt-1">Minimum deposit: $1.00</p>
            </div>

            <div>
              <Label className="text-white text-sm mb-3 block">Select Payment Method</Label>
              <div className="grid gap-3">
                {depositMethods.map((method) => (
                  <Card 
                    key={method.id}
                    className={`cursor-pointer transition-all ${
                      selectedMethod === method.id 
                        ? "bg-indigo-600/30 border-indigo-500" 
                        : "bg-white/5 border-white/20 hover:bg-white/10"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                          {method.icon}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-white">{method.name}</h3>
                          <p className="text-sm text-white/70">{method.description}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(method.id_value, method.name);
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
                onClick={onClose}
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
            <div>
              <Label htmlFor="transactionId" className="text-white text-sm">Transaction ID</Label>
              <Input
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your transaction ID"
                className="bg-white/10 border-indigo-500/30 text-white placeholder:text-white/50"
              />
              <p className="text-xs text-white/70 mt-1">Enter the transaction ID from your payment</p>
            </div>

            <div>
              <Label htmlFor="screenshot" className="text-white text-sm">Upload Screenshot (Optional)</Label>
              <div className="mt-2 flex justify-center border border-dashed border-indigo-500/30 rounded-lg p-6 bg-indigo-500/5">
                <div className="text-center space-y-2">
                  <Upload className="mx-auto h-12 w-12 text-indigo-400" />
                  <p className="text-sm text-white/70">
                    {screenshot ? screenshot.name : "Click to upload or drag and drop"}
                  </p>
                  <input
                    type="file"
                    id="screenshot"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleScreenshotChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-indigo-500/30 bg-indigo-500/20 text-white hover:bg-indigo-500/30"
                    onClick={() => document.getElementById("screenshot")?.click()}
                  >
                    Select File
                  </Button>
                </div>
              </div>
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
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
              >
                Submit Deposit
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
