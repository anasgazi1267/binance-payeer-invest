
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AuthModal } from "@/components/AuthModal";
import { Dashboard } from "@/components/Dashboard";
import { DepositModal } from "@/components/DepositModal";
import { WithdrawModal } from "@/components/WithdrawModal";
import { InvestmentPackages } from "@/components/InvestmentPackages";
import { ReferralSystem } from "@/components/ReferralSystem";
import { Transactions } from "@/components/Transactions";
import { Wallet } from "@/components/Wallet";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

const AppContent = () => {
  const { user, loading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const handleRegister = () => {
    setAuthMode("register");
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    await signOut();
    setActiveTab("dashboard");
    setShowSidebar(false);
    navigate("/");
  };

  const handleModeSwitch = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    switch (tab) {
      case "dashboard":
        navigate("/");
        break;
      case "wallet":
        navigate("/wallet");
        break;
      case "packages":
        navigate("/packages");
        break;
      case "transactions":
        navigate("/transactions");
        break;
      case "referral":
        navigate("/referral");
        break;
      default:
        navigate("/");
        break;
    }
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
      case "wallet":
        return (
          <Wallet
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
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
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Cashjo</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Start your investment journey today with guaranteed daily returns. 
              Choose from our premium investment packages starting at just $1 and watch your money grow!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-indigo-400 mb-2">0.41 - 31.00</div>
                <div className="text-white font-semibold mb-2">Daily Returns ($)</div>
                <div className="text-white/70 text-sm">Guaranteed daily profits on all packages</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">$1</div>
                <div className="text-white font-semibold mb-2">Minimum Start</div>
                <div className="text-white/70 text-sm">Begin investing with just $1</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl p-6">
                <div className="text-3xl font-bold text-pink-400 mb-2">$0.20</div>
                <div className="text-white font-semibold mb-2">Referral Bonus</div>
                <div className="text-white/70 text-sm">Earn for each successful referral</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRegister}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-lg text-lg transition-all hover:scale-105"
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
        currentUser={{ name: user.email || 'User', email: user.email || '' }}
        onLogout={handleLogout}
        onMenuClick={() => setShowSidebar(true)}
      />
      
      <div className="flex pt-20">
        <div className="hidden md:block w-64 flex-shrink-0">
          <Sidebar
            isOpen={true}
            onClose={() => {}}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onLogout={handleLogout}
          />
        </div>
        
        <Sidebar
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          activeTab={activeTab}
          onTabChange={handleTabChange}
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

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
