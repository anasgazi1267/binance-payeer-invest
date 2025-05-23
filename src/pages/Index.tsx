
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AuthModal } from "@/components/AuthModal";
import { Dashboard } from "@/components/Dashboard";
import { DepositModal } from "@/components/DepositModal";
import { WithdrawModal } from "@/components/WithdrawModal";
import { InvestmentPackages } from "@/components/InvestmentPackages";
import { ReferralSystem } from "@/components/ReferralSystem";
import { Transactions } from "@/components/Transactions";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleLogin = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const handleRegister = () => {
    setAuthMode("register");
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab("dashboard");
    setShowSidebar(false);
  };

  const handleModeSwitch = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard 
            onDeposit={() => setShowDepositModal(true)}
            onWithdraw={() => setShowWithdrawModal(true)}
          />
        );
      case "packages":
        return <InvestmentPackages />;
      case "transactions":
        return <Transactions />;
      case "referral":
        return <ReferralSystem />;
      default:
        return (
          <Dashboard 
            onDeposit={() => setShowDepositModal(true)}
            onWithdraw={() => setShowWithdrawModal(true)}
          />
        );
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header 
          isAuthenticated={false}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
        
        <div className="container mx-auto px-4 pt-32 pb-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">Cashjo</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Start your investment journey today with guaranteed daily returns. 
              Choose from our premium investment packages starting at just $5 and watch your money grow!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">8.5% - 18.2%</div>
                <div className="text-white font-semibold mb-2">Daily Returns</div>
                <div className="text-white/70 text-sm">Guaranteed daily profits on all packages</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">$5</div>
                <div className="text-white font-semibold mb-2">Minimum Start</div>
                <div className="text-white/70 text-sm">Begin investing with just $5</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">$0.20</div>
                <div className="text-white font-semibold mb-2">Referral Bonus</div>
                <div className="text-white/70 text-sm">Earn for each successful referral</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRegister}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-lg text-lg transition-all hover:scale-105"
              >
                Start Investing Now
              </button>
              <button
                onClick={handleLogin}
                className="px-8 py-4 border-2 border-white/20 text-white hover:bg-white/10 font-semibold rounded-lg text-lg transition-all"
              >
                I Have An Account
              </button>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onModeSwitch={handleModeSwitch}
          onSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header 
        isAuthenticated={true}
        currentUser={currentUser}
        onLogout={handleLogout}
        onMenuClick={() => setShowSidebar(true)}
      />
      
      <div className="flex pt-20">
        <div className="hidden md:block w-64 flex-shrink-0">
          <Sidebar
            isOpen={true}
            onClose={() => {}}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
          />
        </div>
        
        <Sidebar
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </main>
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
