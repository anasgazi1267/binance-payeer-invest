
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Users, Copy, DollarSign, Award, TrendingUp } from "lucide-react";

export const ReferralSystem = () => {
  const [referralStats] = useState({
    totalReferrals: 0,
    referralBalance: 0.00,
    canWithdraw: false
  });
  
  const [referralLink] = useState("https://cashjo.com/ref/USER123");
  const { toast } = useToast();

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
      className: "bg-slate-800 border-indigo-500/30 text-white"
    });
  };

  const withdrawReferralBalance = () => {
    if (referralStats.totalReferrals < 5) {
      toast({
        title: "Cannot Withdraw",
        description: "You need at least 5 referrals to withdraw your referral balance",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    if (referralStats.referralBalance < 0.5) {
      toast({
        title: "Minimum Withdrawal",
        description: "Minimum withdrawal amount is $0.50",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/30 text-white"
      });
      return;
    }

    toast({
      title: "Withdrawal Requested",
      description: "Your referral balance withdrawal has been requested",
      className: "bg-slate-800 border-green-500/30 text-white"
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Referral System
        </h2>
        <p className="text-gray-300 text-lg">Earn $0.20 for each successful referral</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white hover:border-purple-500/50 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <Users className="mr-2 h-4 w-4 text-purple-400" />
              Total Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{referralStats.totalReferrals}</div>
            <p className="text-xs text-gray-500 mt-1">Active referrals</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white hover:border-green-500/50 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-green-400" />
              Referral Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              ${referralStats.referralBalance.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Available earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white hover:border-amber-500/50 transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <Award className="mr-2 h-4 w-4 text-amber-400" />
              Withdrawal Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${referralStats.totalReferrals >= 5 ? "text-green-400" : "text-red-400"}`}>
              {referralStats.totalReferrals >= 5 ? "Available" : "Locked"}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {5 - referralStats.totalReferrals > 0 ? `Need ${5 - referralStats.totalReferrals} more refs` : "Ready to withdraw"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md border-indigo-500/30 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-100 flex items-center">
            <Copy className="mr-3 h-5 w-5 text-indigo-400" />
            Your Referral Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="referral-link" className="text-gray-300 font-medium">
              Share this link to earn referral bonuses
            </Label>
            <div className="flex mt-3">
              <Input
                id="referral-link"
                value={referralLink}
                readOnly
                className="bg-slate-700/50 border-indigo-500/30 text-white rounded-r-none focus:border-indigo-400"
              />
              <Button 
                onClick={copyReferralLink}
                className="rounded-l-none bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 font-semibold px-6"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-100">Referral Rules & Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-indigo-400 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                How It Works
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  Share your referral link with friends
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  Earn $0.20 per successful referral
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  Referrals must make a deposit to qualify
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  Earnings credited instantly
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-emerald-400 flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Withdrawal Rules
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  Minimum 5 referrals required
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  Minimum withdrawal: $0.50
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  Same withdrawal methods as main balance
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  Processed within 24-48 hours
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              onClick={withdrawReferralBalance}
              disabled={referralStats.totalReferrals < 5 || referralStats.referralBalance < 0.5}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 px-6"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Withdraw Referral Balance
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-100">Recent Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-400">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No referrals yet</p>
            <p className="text-sm mt-2">Start sharing your link to earn bonuses!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
