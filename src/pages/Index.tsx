
import { useState } from "react";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { DepositModal } from "@/components/DepositModal";
import { WithdrawModal } from "@/components/WithdrawModal";
import { InvestmentPackages } from "@/components/InvestmentPackages";
import { ReferralSystem } from "@/components/ReferralSystem";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="mb-8 overflow-x-auto -mx-4 px-4">
          <nav className="flex space-x-1 bg-white/10 backdrop-blur-md p-1 rounded-lg inline-flex min-w-full sm:min-w-0">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "packages", label: "Investment Packages" },
              { id: "referral", label: "Referral System" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap text-sm sm:text-base sm:px-6 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="animate-fade-in">
          {activeTab === "dashboard" && (
            <Dashboard 
              onDeposit={() => setShowDepositModal(true)}
              onWithdraw={() => setShowWithdrawModal(true)}
            />
          )}
          {activeTab === "packages" && <InvestmentPackages />}
          {activeTab === "referral" && <ReferralSystem />}
        </div>
      </div>

      <DepositModal 
        isOpen={showDepositModal} 
        onClose={() => setShowDepositModal(false)} 
      />
      <WithdrawModal 
        isOpen={showWithdrawModal} 
        onClose={() => setShowWithdrawModal(false)} 
      />
    </div>
  );
};

export default Index;
