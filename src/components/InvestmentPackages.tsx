
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const InvestmentPackages = () => {
  const [userBalance] = useState(0); // This would come from user state
  const { toast } = useToast();

  const packages = [
    {
      id: "starter",
      name: "Starter Package",
      price: 10,
      dailyReturn: 0.15,
      duration: 30,
      totalReturn: 4.5,
      features: ["Daily Returns", "30 Days Duration", "0.15% Daily"]
    },
    {
      id: "basic",
      name: "Basic Package",
      price: 50,
      dailyReturn: 0.18,
      duration: 45,
      totalReturn: 8.1,
      features: ["Daily Returns", "45 Days Duration", "0.18% Daily"]
    },
    {
      id: "premium",
      name: "Premium Package",
      price: 100,
      dailyReturn: 0.22,
      duration: 60,
      totalReturn: 13.2,
      features: ["Daily Returns", "60 Days Duration", "0.22% Daily"],
      popular: true
    },
    {
      id: "professional",
      name: "Professional Package",
      price: 500,
      dailyReturn: 0.28,
      duration: 90,
      totalReturn: 25.2,
      features: ["Daily Returns", "90 Days Duration", "0.28% Daily"]
    },
    {
      id: "enterprise",
      name: "Enterprise Package",
      price: 1000,
      dailyReturn: 0.35,
      duration: 120,
      totalReturn: 42,
      features: ["Daily Returns", "120 Days Duration", "0.35% Daily"]
    },
    {
      id: "vip",
      name: "VIP Package",
      price: 5000,
      dailyReturn: 0.45,
      duration: 180,
      totalReturn: 81,
      features: ["Daily Returns", "180 Days Duration", "0.45% Daily"]
    }
  ];

  const handlePurchase = (pkg: typeof packages[0]) => {
    if (userBalance < pkg.price) {
      toast({
        title: "Insufficient Balance",
        description: `You need $${pkg.price} to purchase this package. Please make a deposit first.`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Package Purchased!",
      description: `${pkg.name} activated successfully. You'll start earning daily returns immediately.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Investment Packages</h2>
        <p className="text-white/70">Choose the package that fits your investment goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`bg-white/10 backdrop-blur-md border-white/20 text-white relative ${
              pkg.popular ? "ring-2 ring-purple-500" : ""
            }`}
          >
            {pkg.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-400">${pkg.price}</div>
                <div className="text-sm text-white/70">Investment Amount</div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold text-purple-400">
                  {pkg.dailyReturn}% Daily
                </div>
                <div className="text-sm text-white/70">
                  Total Return: ${pkg.totalReturn} ({pkg.duration} days)
                </div>
              </div>
              
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="text-sm text-white/70 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => handlePurchase(pkg)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={userBalance < pkg.price}
              >
                {userBalance < pkg.price ? "Insufficient Balance" : "Purchase Package"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle>Package Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white/70">
            <li>✅ Automatic daily returns</li>
            <li>✅ Instant package activation</li>
            <li>✅ Compound growth potential</li>
            <li>✅ 24/7 customer support</li>
            <li>✅ Secure investment platform</li>
            <li>✅ Real-time profit tracking</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
