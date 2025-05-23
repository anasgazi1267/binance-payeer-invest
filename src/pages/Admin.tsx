
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminDeposits } from "@/components/admin/AdminDeposits";
import { AdminWithdrawals } from "@/components/admin/AdminWithdrawals";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminPaymentMethods } from "@/components/admin/AdminPaymentMethods";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminContent = () => {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "deposits":
        return <AdminDeposits />;
      case "withdrawals":
        return <AdminWithdrawals />;
      case "users":
        return <AdminUsers />;
      case "payment-methods":
        return <AdminPaymentMethods />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header 
        isAuthenticated={true}
        currentUser={{ name: user.email || 'Admin', email: user.email || '' }}
        onLogout={handleLogout}
        onMenuClick={() => setShowSidebar(true)}
      />
      
      <div className="flex pt-20">
        <div className="hidden md:block w-64 flex-shrink-0">
          <AdminSidebar
            isOpen={true}
            onClose={() => {}}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
          />
        </div>
        
        <AdminSidebar
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
    </div>
  );
};

const Admin = () => {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
};

export default Admin;
