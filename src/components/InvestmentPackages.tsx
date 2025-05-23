
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const InvestmentPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const { toast } = useToast();

  const packages = [
    {
      id: "micro",
      name: "Micro Package",
      price: 1,
      dailyReturn: 0.41,
      duration: 2,
      totalReturn: 0.82,
      description: "Perfect starter package for new investors",
      popular: false
    },
    {
      id: "starter",
      name: "Starter Package",
      price: 5,
      dailyReturn: 0.15,
      duration: 30,
      totalReturn: 4.50,
      description: "Great for beginners starting their investment journey",
      popular: false
    },
    {
      id: "basic",
      name: "Basic Package",
      price: 25,
      dailyReturn: 0.20,
      duration: 30,
      totalReturn: 6.00,
      description: "Ideal for steady growth and consistent returns",
      popular: false
    },
    {
      id: "standard",
      name: "Standard Package",
      price: 50,
      dailyReturn: 0.25,
      duration: 30,
      totalReturn: 7.50,
      description: "Great balance of risk and reward for regular investors",
      popular: true
    },
    {
      id: "premium",
      name: "Premium Package",
      price: 100,
      dailyReturn: 0.35,
      duration: 30,
      totalReturn: 10.50,
      description: "Higher returns for experienced investors",
      popular: false
    },
    {
      id: "vip",
      name: "VIP Package",
      price: 250,
      dailyReturn: 0.45,
      duration: 30,
      totalReturn: 13.50,
      description: "Maximum returns for serious investors",
      popular: false
    },
    {
      id: "elite",
      name: "Elite Package",
      price: 500,
      dailyReturn: 0.60,
      duration: 30,
      totalReturn: 18.00,
      description: "Ultimate package for high-volume investors",
      popular: false
    }
  ];

  const handlePurchase = (packageId: string, price: number) => {
    toast({
      title: "Package Purchase",
      description: `You need to deposit $${price} to activate this package`,
      className: "bg-slate-800 border-indigo-500/30 text-white"
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Investment Packages
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
          Choose from our carefully designed investment packages. Each package offers reliable daily returns. 
          Start investing with as little as $1!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border-slate-700/50 text-white relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-indigo-500/50 cursor-pointer ${
              selectedPackage === pkg.id ? "ring-2 ring-indigo-500 shadow-indigo-500/25" : ""
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0 z-10">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-none rounded-bl-lg font-semibold">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-t-lg"></div>
              <CardTitle className="text-xl font-bold text-center relative z-10 text-gray-100">{pkg.name}</CardTitle>
              <div className="text-center relative z-10">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  ${pkg.price}
                </div>
                <p className="text-gray-400 text-sm mt-1">Investment Amount</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                  <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-green-400">${pkg.dailyReturn}</div>
                  <div className="text-xs text-gray-400">Daily Return</div>
                </div>
                
                <div className="text-center p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                  <Clock className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-blue-400">{pkg.duration}</div>
                  <div className="text-xs text-gray-400">Days</div>
                </div>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                <DollarSign className="h-5 w-5 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-purple-400">${pkg.totalReturn}</div>
                <div className="text-sm text-gray-400">Total Return</div>
              </div>
              
              <p className="text-gray-400 text-sm text-center leading-relaxed">{pkg.description}</p>
              
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePurchase(pkg.id, pkg.price);
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                Purchase Package
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 backdrop-blur-md">
        <h3 className="text-amber-400 font-semibold mb-3 text-lg flex items-center">
          <span className="mr-2">⚠️</span> Important Information
        </h3>
        <ul className="text-amber-200/90 text-sm space-y-2 leading-relaxed">
          <li>• All packages provide reliable daily returns for the specified duration</li>
          <li>• Returns are calculated daily and added to your balance automatically</li>
          <li>• You can purchase multiple packages to increase your daily earnings</li>
          <li>• Minimum withdrawal amount is $0.50</li>
          <li>• Package activation happens immediately after deposit confirmation</li>
        </ul>
      </div>
    </div>
  );
};
