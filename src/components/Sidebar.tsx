
import { Button } from "@/components/ui/button";
import { X, Home, Package, Users, CreditCard, LogOut, ArrowUpDown, Wallet } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar = ({ isOpen, onClose, activeTab, onTabChange, onLogout }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "packages", label: "Investment Packages", icon: Package },
    { id: "transactions", label: "Transactions", icon: ArrowUpDown },
    { id: "referral", label: "Referral System", icon: Users },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900/95 backdrop-blur-md border-r border-white/20 z-50
        transform transition-transform duration-300 ease-in-out pt-20
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:h-auto md:pt-0
      `}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-white font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-indigo-500/40 to-purple-500/40 text-indigo-300 border border-indigo-500/30"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="mt-8 pt-6 border-t border-white/20">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
