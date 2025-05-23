
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
      id: "starter",
      name: "Starter Package",
      price: 5,
      dailyReturn: 8.5,
      duration: 30,
      totalReturn: 255,
      description: "Perfect for beginners to start their investment journey",
      popular: false
    },
    {
      id: "basic",
      name: "Basic Package",
      price: 25,
      dailyReturn: 9.2,
      duration: 30,
      totalReturn: 276,
      description: "Ideal for steady growth and consistent returns",
      popular: false
    },
    {
      id: "standard",
      name: "Standard Package",
      price: 50,
      dailyReturn: 10.5,
      duration: 30,
      totalReturn: 315,
      description: "Great balance of risk and reward for regular investors",
      popular: true
    },
    {
      id: "premium",
      name: "Premium Package",
      price: 100,
      dailyReturn: 12.8,
      duration: 30,
      totalReturn: 384,
      description: "Higher returns for experienced investors",
      popular: false
    },
    {
      id: "vip",
      name: "VIP Package",
      price: 250,
      dailyReturn: 15.5,
      duration: 30,
      totalReturn: 465,
      description: "Maximum returns for serious investors",
      popular: false
    },
    {
      id: "elite",
      name: "Elite Package",
      price: 500,
      dailyReturn: 18.2,
      duration: 30,
      totalReturn: 546,
      description: "Ultimate package for high-volume investors",
      popular: false
    }
  ];

  const handlePurchase = (packageId: string, price: number) => {
    toast({
      title: "Package Purchase",
      description: `You need to deposit $${price} to activate this package`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Investment Packages</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Choose from our carefully designed investment packages. Each package offers guaranteed daily returns 
          for 30 days. Start investing with as little as $5!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`bg-white/10 backdrop-blur-md border-white/20 text-white relative overflow-hidden transition-all hover:scale-105 cursor-pointer ${
              selectedPackage === pkg.id ? "ring-2 ring-green-500" : ""
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-0">
                <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-none rounded-bl-lg">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-center">{pkg.name}</CardTitle>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">${pkg.price}</div>
                <p className="text-white/70 text-sm mt-1">Investment Amount</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-green-400">{pkg.dailyReturn}%</div>
                  <div className="text-xs text-white/70">Daily Return</div>
                </div>
                
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-blue-400">{pkg.duration}</div>
                  <div className="text-xs text-white/70">Days</div>
                </div>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg border border-green-500/30">
                <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-green-400">${pkg.totalReturn}</div>
                <div className="text-sm text-white/70">Total Return</div>
              </div>
              
              <p className="text-white/70 text-sm text-center">{pkg.description}</p>
              
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePurchase(pkg.id, pkg.price);
                }}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
              >
                Purchase Package
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
        <h3 className="text-yellow-400 font-semibold mb-2">⚠️ Important Information</h3>
        <ul className="text-yellow-400/80 text-sm space-y-1">
          <li>• All packages have a 30-day duration with guaranteed daily returns</li>
          <li>• Returns are calculated daily and added to your balance automatically</li>
          <li>• You can purchase multiple packages to increase your daily earnings</li>
          <li>• Minimum withdrawal amount is $1.50</li>
          <li>• Package activation happens immediately after purchase</li>
        </ul>
      </div>
    </div>
  );
};
