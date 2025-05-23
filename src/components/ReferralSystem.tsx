
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const ReferralSystem = () => {
  const [referralStats] = useState({
    totalReferrals: 0,
    referralBalance: 0.00,
    canWithdraw: false
  });
  
  const [referralLink] = useState("https://investpro.com/ref/USER123");
  const { toast } = useToast();

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const withdrawReferralBalance = () => {
    if (referralStats.totalReferrals < 5) {
      toast({
        title: "Cannot Withdraw",
        description: "You need at least 5 referrals to withdraw your referral balance",
        variant: "destructive"
      });
      return;
    }

    if (referralStats.referralBalance < 1.5) {
      toast({
        title: "Minimum Withdrawal",
        description: "Minimum withdrawal amount is $1.50",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Withdrawal Requested",
      description: "Your referral balance withdrawal has been requested",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Referral System</h2>
        <p className="text-white/70">Earn $0.20 for each successful referral</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
            <p className="text-xs text-white/50">Active referrals</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Referral Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              ${referralStats.referralBalance.toFixed(2)}
            </div>
            <p className="text-xs text-white/50">Available earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Withdrawal Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${referralStats.canWithdraw ? "text-green-400" : "text-red-400"}`}>
              {referralStats.totalReferrals >= 5 ? "Available" : "Locked"}
            </div>
            <p className="text-xs text-white/50">
              {5 - referralStats.totalReferrals > 0 ? `Need ${5 - referralStats.totalReferrals} more refs` : "Ready to withdraw"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="referral-link" className="text-white/70">Share this link to earn referral bonuses</Label>
            <div className="flex mt-2">
              <Input
                id="referral-link"
                value={referralLink}
                readOnly
                className="bg-white/10 border-white/20 text-white rounded-r-none"
              />
              <Button 
                onClick={copyReferralLink}
                className="rounded-l-none bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle>Referral Rules & Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-purple-400">How It Works</h4>
              <ul className="space-y-1 text-sm text-white/70">
                <li>• Share your referral link</li>
                <li>• Earn $0.20 per successful referral</li>
                <li>• Referrals must make a deposit to qualify</li>
                <li>• Earnings credited instantly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-400">Withdrawal Rules</h4>
              <ul className="space-y-1 text-sm text-white/70">
                <li>• Minimum 5 referrals required</li>
                <li>• Minimum withdrawal: $1.50</li>
                <li>• Same withdrawal methods as main balance</li>
                <li>• Processed within 24-48 hours</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={withdrawReferralBalance}
              disabled={referralStats.totalReferrals < 5 || referralStats.referralBalance < 1.5}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50"
            >
              Withdraw Referral Balance
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle>Recent Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-white/70">
            No referrals yet. Start sharing your link to earn bonuses!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
