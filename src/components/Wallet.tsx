
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";

interface WalletProps {
  onDeposit: () => void;
  onWithdraw: () => void;
}

export const Wallet = ({ onDeposit, onWithdraw }: WalletProps) => {
  const { balance } = useUserData();

  const mainBalance = balance?.main_balance || 0;
  const referralBalance = balance?.referral_balance || 0;
  const totalBalance = mainBalance + referralBalance;
  const totalDeposited = balance?.total_deposited || 0;
  const totalWithdrawn = balance?.total_withdrawn || 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Wallet</h2>
        <p className="text-indigo-100">
          Manage your funds, make deposits, and withdraw your earnings.
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium text-white">Main Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-indigo-300">${mainBalance.toFixed(2)}</span>
              <div className="h-10 w-10 rounded-full bg-indigo-500/30 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium text-white">Referral Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-300">${referralBalance.toFixed(2)}</span>
              <div className="h-10 w-10 rounded-full bg-purple-500/30 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium text-white">Total Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-300">${totalBalance.toFixed(2)}</span>
              <div className="h-10 w-10 rounded-full bg-green-500/30 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-600/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-300">Total Deposited</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-400">${totalDeposited.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-600/30 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-300">Total Withdrawn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-400">${totalWithdrawn.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800">
          <TabsTrigger value="deposit" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/40 data-[state=active]:to-purple-500/40">
            Deposit
          </TabsTrigger>
          <TabsTrigger value="withdraw" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/40 data-[state=active]:to-purple-500/40">
            Withdraw
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="deposit" className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-md mt-3 p-6">
          <div className="space-y-6">
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-indigo-600/30 flex items-center justify-center mx-auto mb-4">
                <ArrowDown className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Deposit Funds</h3>
              <p className="text-cyan-200 mb-6 max-w-md mx-auto">
                Start your investment journey with a minimum deposit of $1.00. 
                Choose from multiple payment methods including Binance Pay, Payeer, and USDT.
              </p>
              <Button
                onClick={onDeposit}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8"
              >
                Make a Deposit
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="bg-white/5 border-white/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                      <path d="M7 17l2.5-5.5m0 0L12 7l2.5 4.5m-5 0L15.5 17"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Binance Pay</h4>
                    <p className="text-xs text-white/70">Fast & secure transfers</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Payeer</h4>
                    <p className="text-xs text-white/70">Global payment system</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                      <path d="M12 18V6"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">USDT TRC20</h4>
                    <p className="text-xs text-white/70">Tether on TRON network</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="withdraw" className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-md mt-3 p-6">
          <div className="space-y-6">
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-amber-600/30 flex items-center justify-center mx-auto mb-4">
                <ArrowUp className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Withdraw Funds</h3>
              <p className="text-amber-200 mb-6 max-w-md mx-auto">
                Withdraw your earnings anytime with a minimum of $0.50. 
                Fast processing within 24-48 hours to your preferred payment method.
              </p>
              <Button
                onClick={onWithdraw}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8"
                disabled={totalBalance < 0.5}
              >
                Withdraw Funds
              </Button>
              {totalBalance < 0.5 && (
                <p className="text-amber-300 text-sm mt-2">
                  Minimum balance of $0.50 required for withdrawal
                </p>
              )}
            </div>
            
            <div className="mt-4">
              <Card className="bg-white/5 border-amber-500/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 14l.5-.5A2 2 0 0 1 10 13h4a2 2 0 0 0 1.5-.5l.5-.5"/>
                        <path d="M8 10l.5.5A2 2 0 0 0 10 11h4a2 2 0 0 1 1.5.5l.5.5"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">Withdrawal Information</h4>
                      <ul className="text-xs text-amber-200/80 space-y-1 list-disc pl-4">
                        <li>Minimum withdrawal: $0.50</li>
                        <li>Processing time: 24-48 hours</li>
                        <li>Withdrawal to the same payment method used for deposit</li>
                        <li>Referral bonus requires at least 5 referrals to withdraw</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
