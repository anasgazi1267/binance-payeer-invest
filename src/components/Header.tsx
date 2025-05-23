
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [balance] = useState(0.00);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Cashjo</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-white">
              <span className="text-sm text-white/70">Balance:</span>
              <span className="ml-2 font-bold text-lg">${balance.toFixed(2)}</span>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Profile
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
